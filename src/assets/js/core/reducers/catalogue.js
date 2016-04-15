import Immutable from 'immutable';
import Constants from '../Constants';
import { combineReducers, createReducer } from 'redux-immutablejs';

const Actions = Constants.ActionTypes;

let campaigns = createReducer(new Immutable.Map({
  //filter: null
}), {
  //['CATALOGUE_CAMPAIGNS_FILTER']: (state, action) => state.set('filter', action.payload.filter)
});

export default combineReducers({
  campaigns
});