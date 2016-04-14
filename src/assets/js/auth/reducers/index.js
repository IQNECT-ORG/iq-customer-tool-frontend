import Immutable from 'immutable';
import Constants from '../Constants';
import { combineReducers, createReducer } from 'redux-immutablejs';
import recycleState from 'redux-recycle';

const Actions = Constants.ActionTypes;

const initialState = new Immutable.Map({
  isLoggedIn: false
});

let reducer = createReducer(initialState, {
  [Actions.AUTH_LOGIN_SUCCESS]: (state, action) => state.set('isLoggedIn', true),
});

reducer = recycleState(reducer, [], initialState);

export default reducer;