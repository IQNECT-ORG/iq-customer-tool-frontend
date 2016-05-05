import Immutable from 'immutable';
import Constants from '../Constants';
import { createReducer } from 'redux-create-reducer';
import _ from 'lodash';

const Actions = Constants.ActionTypes;

let coreReducer = createReducer([], {

});

let reducer = (state, action) => {
  if(action.error === true) {
    const newState = _.cloneDeep(state);
    newState.push(action.payload);
    return newState;
  } else {
    return coreReducer(state, action);
  }
};

export default reducer;