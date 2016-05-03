import Constants from '../Constants';
import { createReducer } from 'redux-create-reducer';
import { combineReducers } from 'redux';
import recycleState from 'redux-recycle';

const Actions = Constants.ActionTypes;

const createInitialState = {
  selectedBrandId: null,
  selectedCampaignTypeId: null
};

const create = createReducer(createInitialState, {
  [Actions.CAMPAIGN_CREATE_BRAND_SELECT]: (state, action) => _.assign({}, state, { selectedBrandId: action.payload }),
  [Actions.CAMPAIGN_CREATE_CAMPAIGN_TYPE_SELECT]: (state, action) => _.assign({}, state, { selectedCampaignTypeId: action.payload })
});

const editInitialState = {};

const edit = createReducer(editInitialState, {
});

export default combineReducers({
  create: recycleState(create, [Actions.CAMPAIGN_CREATE_RESET], createInitialState),
  edit: recycleState(edit, [], editInitialState)
});