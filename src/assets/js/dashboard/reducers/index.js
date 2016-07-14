import { createReducer } from 'redux-create-reducer';
import _ from 'lodash';
import {
  M_DASHBOARD_UPDATE_CAMPAIGNS_COUNT,
  M_DASHBOARD_UPDATE_TRIGGERS_COUNT,
  M_DASHBOARD_UPDATE_MATCHES_COUNT,
  M_DASHBOARD_UPDATE_TOP_BRANDS
} from '../messages';

export const initialState = {
  campaignsCount: null,
  triggersCount: null,
  matchesCount: null,
  topBrands: null
};

export default createReducer(initialState, {
  [M_DASHBOARD_UPDATE_CAMPAIGNS_COUNT]: (state, action) => {
    return _.assign({}, state, {
      campaignsCount: action.payload.count
    });
  },
  [M_DASHBOARD_UPDATE_TRIGGERS_COUNT]: (state, action) => {
    return _.assign({}, state, {
      triggersCount: action.payload.count
    });
  },
  [M_DASHBOARD_UPDATE_MATCHES_COUNT]: (state, action) => {
    return _.assign({}, state, {
      matchesCount: action.payload
    });
  },
  [M_DASHBOARD_UPDATE_TOP_BRANDS]: (state, action) => {
    return _.assign({}, state, {
      topBrands: action.payload
    });
  }
});