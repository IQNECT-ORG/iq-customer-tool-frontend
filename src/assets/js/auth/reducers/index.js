import Constants from '../Constants';
import recycleState from 'redux-recycle';
import { combineReducers } from 'redux';
import { createReducer } from 'redux-create-reducer';
import _ from 'lodash';

const Actions = Constants.ActionTypes;

const initialState = {
  userId: null
};

let reducer = createReducer(initialState, {
  [Actions.AUTH_LOGIN_SUCCESS]: (state, action) => {
    return _.assign({}, state, {
      userId: action.payload.result
    });
  },
  ['AUTH_AUTHENTICATE_SUCCESS']: (state, action) => {
    return _.assign({}, state, {
      userId: action.payload.result
    });
  }
});

reducer = recycleState(reducer, [], initialState);

export default reducer;