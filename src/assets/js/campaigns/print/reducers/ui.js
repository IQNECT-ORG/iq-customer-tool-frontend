import Immutable from 'immutable';
import Constants from '../Constants';
import { createReducer } from 'redux-immutablejs';

const Actions = Constants.ActionTypes;

const initialState = new Immutable.Map({
  addWebsiteModalOpen: false
});

export default createReducer(initialState, {
  [Actions.CAMPAIGN_PRINT_ADD_WEBSITE_MODAL_OPEN]: state => state.set('addWebsiteModalOpen', true),
  [Actions.CAMPAIGN_PRINT_ADD_WEBSITE_MODAL_CLOSE]: state => state.set('addWebsiteModalOpen', false)
});