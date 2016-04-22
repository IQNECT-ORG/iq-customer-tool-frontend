import Immutable from 'immutable';
import Constants from '../Constants';
import { combineReducers, createReducer } from 'redux-immutablejs';
import recycleState from 'redux-recycle';

const Actions = Constants.ActionTypes;

const createInitialState = new Immutable.Map({
  selectedBrandId: null,
  selectedCampaignTypeId: null
});

const create = createReducer(createInitialState, {
  [Actions.CAMPAIGN_CREATE_BRAND_SELECT]: (state, action) => state.set('selectedBrandId', action.payload),
  [Actions.CAMPAIGN_CREATE_CAMPAIGN_TYPE_SELECT]: (state, action) => state.set('selectedCampaignTypeId', action.payload)
});

const editInitialState = new Immutable.Map({

});

const edit = createReducer(editInitialState, {
  
});

export default combineReducers({
  create: recycleState(create, [Actions.CAMPAIGN_CREATE_RESET], createInitialState),
  edit: recycleState(edit, [], editInitialState)
});