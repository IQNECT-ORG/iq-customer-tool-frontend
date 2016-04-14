import Constants from '../Constants';
import { createAction } from 'redux-actions';

const Actions = Constants.ActionTypes;

export const authLogin = createAction(Actions.AUTH_LOGIN_REQUEST);
export const authLoginSuccess = createAction(Actions.AUTH_LOGIN_SUCCESS);
export const authLoginFailure = createAction(Actions.AUTH_LOGIN_FAILURE);