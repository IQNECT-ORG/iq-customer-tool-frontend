import Constants from '../Constants';
import { createReducer } from 'redux-create-reducer';
import _ from 'lodash';

const Actions = Constants.ActionTypes;

const initialState = {
  campaignsCount: null,
  triggersCount: null,
  matchesCount: null,
  topBrands: null
};

export default createReducer(initialState, {
  [Actions.DASHBOARD_UPDATE_CAMPAIGNS_COUNT]: (state, action) => {
    return _.assign({}, state, {
      campaignsCount: action.payload.count
    });
  },
  [Actions.DASHBOARD_UPDATE_TRIGGERS_COUNT]: (state, action) => {
    return _.assign({}, state, {
      triggersCount: action.payload.count
    });
  },
  [Actions.DASHBOARD_UPDATE_MATCHES_COUNT]: (state, action) => {
    return _.assign({}, state, {
      matchesCount: action.payload.count
    });
  },
  [Actions.DASHBOARD_UPDATE_TOP_BRANDS]: (state, action) => {
    return _.assign({}, state, {
      topBrands: action.payload
    });
  }
});