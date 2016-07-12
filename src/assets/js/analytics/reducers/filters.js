import { createReducer } from 'redux-create-reducer';
import _ from 'lodash';
import moment from 'moment';
import {
  M_ANALYTICS_UPDATE_FILTERS
} from '../messages';

export const initialState = {
  campaignId: null,
  periodStart: moment().startOf('day').valueOf(),
  periodEnd: moment().endOf('day').valueOf(),
  triggerId: null,
  frameId: null
};

export default createReducer(initialState, {
 [M_ANALYTICS_UPDATE_FILTERS]: (state, action) => {
  return _.assign({}, state, action.payload);
 }
});