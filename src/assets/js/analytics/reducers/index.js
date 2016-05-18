import Constants from '../Constants';
import { createReducer } from 'redux-create-reducer';
import { combineReducers } from 'redux';
import _ from 'lodash';

const Actions = Constants.ActionTypes;

const filters = createReducer({
  campaignId: null,
  periodStart: null,
  periodEnd: null,
  triggerId: null,
  frameId: null
}, {
 ['ANALYTICS_FILTERS_UPDATE']: (state, action) => {
  return _.assign({}, state, action.payload);
 }
});

const data = createReducer({
  topBrands: null,
  topImageTriggers: null,
  allSearches: null,
}, {
  ['ANALYTICS_UPDATE_DATA_ALL_SEARCHES']: (state, action) => {
    return _.assign({}, state, {
      allSearches: action.payload
    });
  },
});

export default combineReducers({
  filters,
  data
});
