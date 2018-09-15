import axios from 'axios';
import * as _ from 'lodash';

import { store, storeActions } from '@Store/store';

const robinUrl = 'https://api.robinhood.com/';

class RobinHood {
  positionsURL: string;
  constructor() {
    this.positionsURL = '';
  }

  async authorize(username: string, password: string) {
    const data = await this.http({
      method: 'post',
      url: `${robinUrl}oauth2/token/`,
      data: {
        username,
        password,
      },
    });

    // to factor auth required
    if (data['mfa_required']) {
      return {
        username,
        password,
        mfa: true,
      };
    }

    // else no two factor
    store.dispatch({ type: storeActions.SET_TOKEN, value: data.access_token });

    // lets get account while we're at it
    return this.getAccountInfo();
  }

  async confirmMFA(mfa: object) {
    const data = await this.http({
      method: 'post',
      url: `${robinUrl}oauth2/token/`,
      data: {
        ...mfa,
        grant_type: 'password',
        client_id: 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS',
      },
    });

    store.dispatch({ type: storeActions.SET_TOKEN, value: data.access_token });

    // lets get account while we're at it
    return this.getAccountInfo();
  }

  getAccountInfo() {
    return this.http({
      method: 'get',
      url: `${robinUrl}accounts/`,
      headers: {
        Authorization: `Bearer ${store.getState().account.token}`,
      },
    }).then((resp) => {
      const account = resp.results[0];
      store.dispatch({ type: storeActions.SET_URL, value: account.url });
      store.dispatch({ type: storeActions.SET_BUYPOWER, value: account['buying_power'] });
      this.positionsURL = account.positions;
    });
  }

  // todo rbaxter create orderRequest data class
  async placeOrder(orderRequest: any) {

    _.extend(orderRequest, {
      account: store.state.account.url,
      instrument: store.state.ticker.url,
    });

    // send buy request
    const resp = await this.http({
      method: 'post',
      url: `${robinUrl}orders/`,
      data: orderRequest,
      headers: {
        Authorization: `Bearer ${store.getState().account.token}`,
      },
    });

    this.getPositions(); // update positions
    this.getAccountInfo(); // update buyPower
    return resp;
  }

  async getPositions() {
    const resp = await this.http({
      method: 'get',
      url: `${this.positionsURL}?nonzero=true`,
      headers: {
        Authorization: `Bearer ${store.getState().account.token}`,
      },
    });

    return resp.results;
  }

  async getQuote(ticker: string) {
    const data = await this.http({
      method: 'get',
      url: `${robinUrl}quotes/?symbols=${ticker}`,
    });

    return data.results[0];
  }

  async getTickerInfo(ticker: string) {
    const resp = await this.http({
      method: 'get',
      url: `${robinUrl}instruments/?symbol=${ticker}`,
    });

    return resp.results[0];
  }

  // todo rbaxter create stock type
  async getInstrumentInfo(stock: any) {
    const instrumentInfo = await this.http({
      method: 'get',
      url: stock.instrument,
    });

    return {
      name: instrumentInfo['simple_name'],
      targetPercentage: 0,
      itemBalance: stock['average_buy_price'] * stock.quantity,
    };
  }

  // todo rbaxter create requestObj type
  async http(requestObj: any): Promise<any> {
    try {
      const resp = await axios(requestObj);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new RobinHood();
