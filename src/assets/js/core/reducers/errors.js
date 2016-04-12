import Immutable from 'immutable';
import Constants from '../Constants';
import { combineReducers, createReducer } from 'redux-immutablejs';

const Actions = Constants.ActionTypes;

let coreReducer = createReducer(new Immutable.List(), {

});

let reducer = (state, action) => {
  if(action.error === true) {
    return state.push(new Immutable.Map({
      code: action.payload.code,
      message: action.payload.message
    }));
  } else {
    return coreReducer(state, action);
  }
};

export default reducer;