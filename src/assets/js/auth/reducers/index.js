import recycleState from 'redux-recycle';
import { createReducer } from 'redux-create-reducer';
import _ from 'lodash';
import {
  M_AUTH_LOGIN_REQUEST,
  M_AUTH_LOGIN_SUCCESS,
  M_AUTH_LOGIN_FAILURE,
  M_AUTH_FORGOTTEN_PASSWORD_REQUEST,
  M_AUTH_FORGOTTEN_PASSWORD_SUCCESS,
  M_AUTH_FORGOTTEN_PASSWORD_FAILURE,
  M_AUTH_RESET_PASSWORD_REQUEST,
  M_AUTH_RESET_PASSWORD_SUCCESS,
  M_AUTH_RESET_PASSWORD_FAILURE,
  M_AUTH_AUTHENTICATED
} from '../messages';

export const initialState = {
  userId: null
};

let reducer = createReducer(initialState, {
  [M_AUTH_LOGIN_SUCCESS]: (state, action) => {
    return _.assign({}, state, {
      userId: action.payload.result
    });
  },
  [M_AUTH_AUTHENTICATED]: (state, action) => {
    return _.assign({}, state, {
      userId: action.payload.result
    });
  }
});

reducer = recycleState(reducer, [], initialState);

export default reducer;