import Immutable from 'immutable';
import Constants from '../Constants';
import { createReducer } from 'redux-create-reducer';
import { combineReducers } from 'redux';

const Actions = Constants.ActionTypes;

let campaigns = createReducer({}, {
  //['CATALOGUE_CAMPAIGNS_FILTER']: (state, action) => state.set('filter', action.payload.filter)
});

export default combineReducers({
  campaigns
});