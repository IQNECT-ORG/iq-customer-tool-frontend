import { createReducer } from 'redux-create-reducer';
import _ from 'lodash';
import {
  M_ANALYTICS_UPDATE_DATA_ALL_SEARCHES
} from '../messages';

export const initialState = {
  topBrands: null,
  topImageTriggers: null,
  allSearches: null
};

export default createReducer(initialState, {
  [M_ANALYTICS_UPDATE_DATA_ALL_SEARCHES]: (state, action) => {
    return _.assign({}, state, {
      allSearches: action.payload
    });
  }
});