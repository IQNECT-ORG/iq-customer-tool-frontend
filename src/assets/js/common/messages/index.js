import { createAction } from 'redux-actions';

// Alert
export const M_ALERT_MESSAGE_READ = 'M_ALERT_MESSAGE_READ';

export const alertMessageRead = createAction(M_ALERT_MESSAGE_READ);

// Verify Authentication
export const M_SESSION_VERIFY_REQUEST = 'M_SESSION_VERIFY_REQUEST';
export const M_SESSION_VERIFY_SUCCESS = 'M_SESSION_VERIFY_SUCCESS';
export const M_SESSION_VERIFY_FAILURE = 'M_SESSION_VERIFY_FAILURE';

export const sessionVerifyRequest = createAction(M_SESSION_VERIFY_REQUEST);
export const sessionVerifySuccess = createAction(M_SESSION_VERIFY_SUCCESS);
export const sessionVerifyFailure = createAction(M_SESSION_VERIFY_FAILURE);

// Logout
export const M_SESSION_LOGOUT_REQUEST = 'M_SESSION_LOGOUT_REQUEST';
export const M_SESSION_LOGOUT_SUCCESS = 'M_SESSION_LOGOUT_SUCCESS';
export const M_SESSION_LOGOUT_FAILURE = 'M_SESSION_LOGOUT_FAILURE';

export const sessionLogoutRequest = createAction(M_SESSION_LOGOUT_REQUEST);
export const sessionLogoutSuccess = createAction(M_SESSION_LOGOUT_SUCCESS);
export const sessionLogoutFailure = createAction(M_SESSION_LOGOUT_FAILURE);