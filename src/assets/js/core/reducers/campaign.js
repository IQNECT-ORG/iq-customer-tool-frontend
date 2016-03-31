import Immutable from 'immutable';
import Constants from '../Constants';
import { combineReducers } from 'redux-immutable';

const Actions = Constants.ActionTypes;

export default combineReducers({
  create: function(state, action) {
    if(state == null) {
      return new Immutable.Map({
      });
    }

    switch(action.type) {
    }
    return state;
  }
});