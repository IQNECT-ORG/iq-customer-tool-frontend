import Constants from '../Constants';
import { createAction } from 'redux-actions';

const Actions = Constants.ActionTypes;

export const authLogin = createAction(Actions.AUTH_LOGIN_REQUEST);
export const authLoginSuccess = createAction(Actions.AUTH_LOGIN_SUCCESS);
export const authLoginFailure = createAction(Actions.AUTH_LOGIN_FAILURE);

export const authForgottenPassword = createAction(Actions.AUTH_FORGOTTEN_PASSWORD_REQUEST);
export const authForgottenPasswordSuccess = createAction(Actions.AUTH_FORGOTTEN_PASSWORD_SUCCESS);
export const authForgottenPasswordFailure = createAction(Actions.AUTH_FORGOTTEN_PASSWORD_FAILURE);

export const authResetPassword = createAction(Actions.AUTH_RESET_PASSWORD_REQUEST);
export const authResetPasswordSuccess = createAction(Actions.AUTH_RESET_PASSWORD_SUCCESS);
export const authResetPasswordFailure = createAction(Actions.AUTH_RESET_PASSWORD_FAILURE);