import { createStore, combineReducers } from 'redux';
import * as _ from 'lodash';

interface action {
  type: string;
  value: any;
}

const initState = {
  buyPower: 0,
  token: '',
  url: '',
};

const storeActions = {
  SET_BUYPOWER: 'SET_BUYPOWER',
  SET_TOKEN: 'SET_TOKEN',
  SET_URL: 'SET_URL',
};

function account(state = initState, action: action) {
  switch (action.type) {
    case storeActions.SET_BUYPOWER:
      return { ...state, buyPower: action.value };
    case storeActions.SET_TOKEN:
      return { ...state, token: action.value };
    case storeActions.SET_URL:
      return { ...state, url: action.value };
    default:
      return state;
  }
}

const initProfile: any[] = [];

function portfolio(state = initProfile, action: action) {
  switch (action.type) {
    case profileStoreAction.UPDATE_PROFILE:
      const newState = state.concat(action.value);
      localStorage.setItem('portfolioProfile', JSON.stringify(newState));
      return newState;
    case profileStoreAction.CLEAR_PROFILE:
      localStorage.setItem('portfolioProfile', JSON.stringify(initProfile));
      return initProfile;
    case profileStoreAction.SET_PROFILE:
      localStorage.setItem('portfolioProfile', JSON.stringify(action.value));
      return action.value;
    default:
      return state;
  }
}

function removeFromObjTree(level: any[], itemId: string) {
  const cleanedTree = _.remove(level, (item: any) => {
    return item.id !== itemId;
  });

  // clean the children
  _.each(cleanedTree, (item: any) => {
    item.subItems = removeFromObjTree(item.subItems, item);
  });

  return cleanedTree;
}

export const profileStoreAction = {
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  SET_PROFILE: 'SET_PROFILE',
  CLEAR_PROFILE: 'CLEAR_PROFILE',
};

export const removeItem = (state: any, itemId: string) => {
  const cleanedTree = removeFromObjTree(state, itemId);
  return {
    type: profileStoreAction.SET_PROFILE,
    value: cleanedTree,
  };
};

const updatePercentageHelper = (state: any, percent: any, id: any) => {
  _.each(state, (group) => {
    if (group.id === id) {
      group.targetPercentage = percent;
      return;
    }

    updatePercentageHelper(group.subItems, percent, id);
  });

  return state;
};

export const updatePercentage = (state: any, percentage: Number, id: any) => {
  const newTree = updatePercentageHelper(_.cloneDeep(state), percentage, id);
  return {
    type: profileStoreAction.SET_PROFILE,
    value: newTree,
  };
};

// todo rbaxter see @types/redux
interface store {
  state: any;
  dispatch: any;
  getState: any;
  subscribe: any;
}

const store: store = createStore(
  combineReducers({ account, portfolio }),
);

export {
  store,
  storeActions,
};
