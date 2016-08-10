import { createAction } from 'redux-actions';

export const S_AUTH_LOGIN = 'S_AUTH_LOGIN';
export const S_AUTH_FORGOTTEN_PASSWORD = 'S_AUTH_FORGOTTEN_PASSWORD';
export const S_AUTH_RESET_PASSWORD = 'S_AUTH_RESET_PASSWORD';

export const authLogin = createAction(S_AUTH_LOGIN);
export const authForgottenPassword = createAction(S_AUTH_FORGOTTEN_PASSWORD);
export const authResetPassword = createAction(S_AUTH_RESET_PASSWORD);
