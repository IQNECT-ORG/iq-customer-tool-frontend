import { createReducer } from 'redux-create-reducer';
import _ from 'lodash';
import {
  M_ALERT_MESSAGE_READ
} from 'app/common/messages';
import {
  AlertMessageLevels
} from 'app/common/Constants';

const initialState = [];

const coreReducer = createReducer(initialState, {
  [M_ALERT_MESSAGE_READ]: (state, action) => {
    const newState = _.cloneDeep(state);
    // Using lodash to get the element
    // as the payload is typeof object
    // when it should be a number
    // therefore it is unable to get
    // the element from the array
    const message = _.nth(newState, action.payload);
    message.read = true;
    return newState;
  }
});

export default (state, action) => {
  if(action.error === true) {
    const newState = _.cloneDeep(state);
    const error = action.payload;

    const message = {
      level: AlertMessageLevels.DANGER,
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