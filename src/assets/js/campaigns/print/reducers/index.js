import Immutable from 'immutable';
import Constants from '../Constants';
import { combineReducers, createReducer } from 'redux-immutablejs';

const Actions = Constants.ActionTypes;

const create = combineReducers({

});

export default combineReducers({
  test: (state) => new Immutable.Map()
});