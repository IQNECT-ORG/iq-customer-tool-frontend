import Immutable from 'immutable';
import Constants from '../Constants';
import { combineReducers, createReducer } from 'redux-immutablejs';

const Actions = Constants.ActionTypes;

const create = createReducer(new Immutable.Map({
  selectedBrandId: null,
  selectedCampaignType: null
}), {
  [Actions.CAMPAIGN_CREATE_BRAND_SELECT]: (state, action) => state.set('selectedBrandId', action.payload),
  [Actions.CAMPAIGN_CREATE_CAMPAIGN_TYPE_SELECT]: (state, action) => state.set('selectedCampaignType', action.payload)
});

export default combineReducers({
  create
});