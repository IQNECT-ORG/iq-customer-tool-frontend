import Immutable from 'immutable';
import Constants from './Constants';
import { combineReducers, createReducer } from 'redux-immutablejs';

const Actions = Constants.ActionTypes;
const initialState = new Immutable.Map({
  isOpen: false,
  path: null
});

export default createReducer(initialState, {
  [Actions.MODAL_CLOSE]: (state, action) => state.set('isOpen', false),
  [Actions.MODAL_OPEN]: (state, action) => state.set('isOpen', true),
  [Actions.MODAL_UPDATE_PATH]: (state, action) => state.set('path', action.payload.path)
});