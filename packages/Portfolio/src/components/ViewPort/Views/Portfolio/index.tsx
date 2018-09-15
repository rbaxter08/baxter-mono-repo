import * as React from 'react';
import {
  Form,
  Button,
  Input,
  InputGroup,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ButtonDropdown,
  InputGroupText,
} from 'reactstrap';
import { FaCog, FaSync } from 'react-icons/fa';
import * as _ from 'lodash';

import { Toolbar, ToolbarSection } from '@Common/Toolbar';
import { store, profileStoreAction, removeItem, updatePercentage } from '@Store/store';
import Robinhood from '@Services/Robinhood';

import PortfolioGroup from './PortfolioGroup';

import './main.scss';

// {
//   name: 'Technology',
//   targetPercentage: 60,
//   itemBalance: 5000,
//   subItems: [...]
// }

interface stateTypes {
  accountBalance: number;
  targetPercent: number;
  itemName: string;
  isSettingOpen: boolean;
  portfolio: any[];
  invalidItemName: boolean;
  isAddItemDialogOpen: boolean;
}

class Portfolio extends React.Component<{}, stateTypes> {
  state = {
    accountBalance: 0,
    targetPercent: 0,
    itemName: '',
    isSettingOpen: false,
    portfolio: [''],
    invalidItemName: false,
    isAddItemDialogOpen: false,
  };

  nameInput: any;

  constructor(props: any) {
    super(props);
    store.subscribe(() => {
      this.determineAccountValue();
      this.setState({
        portfolio: store.getState().portfolio,
      });
    });
  }

  componentDidMount() {
    // check if user has a profile saved
    try {
      const profile = JSON.parse(localStorage.getItem('portfolioProfile'));
      this.updateIds(profile);
      store.dispatch({
        value: profile,
        type: profileStoreAction.SET_PROFILE,
      });
    } catch (error) {
      // portfolio is already init within the store
    }
  }

  updateIds(items: any) {
    _.each(items, (item) => {
      item.id = _.uniqueId();
      this.updateIds(item.subItems);
    });
  }

  determineAccountValue() {
    let accountBalance = 0;

    const {
      portfolio,
    } = store.getState();

    portfolio.forEach((stock: any) => {
      accountBalance += stock.itemBalance;
    });

    this.setState({
      accountBalance,
    });
  }

  addItems(e: any) {
    e.preventDefault();
    if (this.validateForm()) {
      const item = {
        name: this.state.itemName,
        targetPercentage: this.state.targetPercent,
        itemBalance: 0,
        id: _.uniqueId(),
      };

      store.dispatch({
        type: profileStoreAction.UPDATE_PROFILE,
        value: [item],
      });

      this.setState({
        targetPercent: 0,
        itemName: '',
      });

      this.nameInput.focus();
    }
  }

  validateForm() {
    if (this.state.itemName) {
      return true;
    }

    this.setState({
      invalidItemName: true,
    });

    return false;
  }

  formatPercentage(e: any) {
    const percent = parseFloat(e.target.value);
    if (percent && percent >= 0 && percent <= 100) {
      return percent;
    }

    if (!percent) {
      return 0;
    }

    return this.state.targetPercent;
  }

  async syncRobinhood() {
    const positions = await Robinhood.getPositions();

    const newPositions = await Promise.all(positions.map(async (stock: any) => {
      return await Robinhood.getInstrumentInfo(stock);
    }));

    _.each(newPositions, (item: any) => {
      item.id = _.uniqueId();
    });

    store.dispatch({
      type: profileStoreAction.UPDATE_PROFILE,
      value: newPositions,
    });
  }

  removeGroupItem(itemId: string) {
    store.dispatch(removeItem(store.getState().portfolio, itemId));
  }

  onPercentageChange(percentage: any, id: any) {
    store.dispatch(updatePercentage(store.getState().portfolio, percentage, id));
  }

  render() {
    return (
      <div className="viewport-layout">
        <Toolbar>
          <ToolbarSection>
            My Portfolio ${this.state.accountBalance}
          </ToolbarSection>
          <ToolbarSection>
            <Form id="item-input" onSubmit={e => this.addItems(e)}>
              <Input placeholder="Enter company or group name"
                innerRef={nameInput => this.nameInput = nameInput}
                invalid={this.state.invalidItemName}
                id="name-input"
                value={this.state.itemName}
                onChange={(e) => {
                  this.setState({ itemName: e.target.value, invalidItemName: false });
                }}>
              </Input>
              <InputGroup>
                <Input placeholder="100"
                  id="percent-input"
                  type="number"
                  value={this.state.targetPercent}
                  onChange={(e) => {
                    const value = this.formatPercentage(e);
                    this.setState({ targetPercent: value });
                  }} />
                <InputGroupText>%</InputGroupText>
              </InputGroup>
              <Button type="submit"
                style={{ display: 'none' }}
                onClick={() => this.setState({ isAddItemDialogOpen: true })}>
              </Button>
            </Form>
            <ButtonDropdown isOpen={this.state.isSettingOpen} toggle={() => {
              this.setState({ isSettingOpen: !this.state.isSettingOpen });
            }}>
              <DropdownToggle>
                <FaCog />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => this.syncRobinhood()}>
                  <FaSync className="drop-down-icon" />
                  Sync w/ Robinhood
                </DropdownItem>
                <DropdownItem onClick={() => store.dispatch({
                  type: profileStoreAction.CLEAR_PROFILE,
                })
                }>
                  <FaSync className="drop-down-icon" />
                  Delete All
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </ToolbarSection>
        </Toolbar>
        <div id="portfolio-container">
          {this.state.portfolio && this.state.portfolio.map((item: any, key) => {
            return (
              <PortfolioGroup
                {...item}
                onPercentageChange={(percent: any, id: any) => this.onPercentageChange(percent, id)}
                key={key}
                onRemove={() => this.removeGroupItem(item.id)}
                parentBalance={this.state.accountBalance}>
              </PortfolioGroup>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Portfolio;
