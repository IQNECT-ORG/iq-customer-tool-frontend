import Immutable from 'immutable';
import Constants from '../Constants';
import { createReducer } from 'redux-create-reducer';
import _ from 'lodash';

const Actions = Constants.ActionTypes;

let coreReducer = createReducer([], {

});

let reducer = (state, action) => {
  if(action.error === true) {
    return _.cloneDeep(state).push({
      name: action.payload.name,
      message: action.payload.message
    });
  } else {
    return coreReducer(state, action);
  }
};

export default reducer;