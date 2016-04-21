import keyMirror from 'keymirror';

export default {
  ActionTypes: keyMirror({
    AUTH_LOGIN: null,
    AUTH_LOGIN_REQUEST: null,
    AUTH_LOGIN_SUCCESS: null,
    AUTH_LOGIN_FAILURE: null,

    AUTH_FORGOTTEN_PASSWORD: null,
    AUTH_FORGOTTEN_PASSWORD_REQUEST: null,
    AUTH_FORGOTTEN_PASSWORD_SUCCESS: null,
    AUTH_FORGOTTEN_PASSWORD_FAILURE: null,

    AUTH_RESET_PASSWORD: null,
    AUTH_RESET_PASSWORD_REQUEST: null,
    AUTH_RESET_PASSWORD_SUCCESS: null,
    AUTH_RESET_PASSWORD_FAILURE: null,
  })
};
