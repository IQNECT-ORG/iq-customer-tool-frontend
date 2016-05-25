import Immutable from 'immutable';
import Constants from '../Constants';
import { createReducer } from 'redux-create-reducer';
import _ from 'lodash';

const Actions = Constants.ActionTypes;

let coreReducer = createReducer([], {
  ALERT_MESSAGE_READ: (state, action) => {
    const newState = _.cloneDeep(state);
    newState[action.payload].read = true;
    return newState;
  }
});

let reducer = (state, action) => {
  if(action.error === true) {
    const newState = _.cloneDeep(state);
    const error = action.payload;

    const message = {
      level: 'danger',
      message: error.message,
      name: error.name,
      read: false
    };

    newState.push(message);
    return newState;
  } else {
    return coreReducer(state, action);
  }
};

export default reducer;