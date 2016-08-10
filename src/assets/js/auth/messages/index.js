import { createAction } from 'redux-actions';

// Login
export const M_AUTH_LOGIN_REQUEST = 'M_AUTH_LOGIN_REQUEST';
export const M_AUTH_LOGIN_SUCCESS = 'M_AUTH_LOGIN_SUCCESS';
export const M_AUTH_LOGIN_FAILURE = 'M_AUTH_LOGIN_FAILURE';

export const authLoginRequest = createAction(M_AUTH_LOGIN_REQUEST);
export const authLoginSuccess = createAction(M_AUTH_LOGIN_SUCCESS);
export const authLoginFailure = createAction(M_AUTH_LOGIN_FAILURE);

// Forgotten Password
export const M_AUTH_FORGOTTEN_PASSWORD_REQUEST = 'M_AUTH_FORGOTTEN_PASSWORD_REQUEST';
export const M_AUTH_FORGOTTEN_PASSWORD_SUCCESS = 'M_AUTH_FORGOTTEN_PASSWORD_SUCCESS';
export const M_AUTH_FORGOTTEN_PASSWORD_FAILURE = 'M_AUTH_FORGOTTEN_PASSWORD_FAILURE';

export const authForgottenPasswordRequest = createAction(M_AUTH_FORGOTTEN_PASSWORD_REQUEST);
export const authForgottenPasswordSuccess = createAction(M_AUTH_FORGOTTEN_PASSWORD_SUCCESS);
export const authForgottenPasswordFailure = createAction(M_AUTH_FORGOTTEN_PASSWORD_FAILURE);

// Reset Password
export const M_AUTH_RESET_PASSWORD_REQUEST = 'M_AUTH_RESET_PASSWORD_REQUEST';
export const M_AUTH_RESET_PASSWORD_SUCCESS = 'M_AUTH_RESET_PASSWORD_SUCCESS';
export const M_AUTH_RESET_PASSWORD_FAILURE = 'M_AUTH_RESET_PASSWORD_FAILURE';

export const authResetPasswordRequest = createAction(M_AUTH_RESET_PASSWORD_REQUEST);
export const authResetPasswordSuccess = createAction(M_AUTH_RESET_PASSWORD_SUCCESS);
export const authResetPasswordFailure = createAction(M_AUTH_RESET_PASSWORD_FAILURE);

// Authentication
export const M_AUTH_AUTHENTICATED = 'M_AUTH_AUTHENTICATED';

export const authAuthenticated = createAction(M_AUTH_AUTHENTICATED);