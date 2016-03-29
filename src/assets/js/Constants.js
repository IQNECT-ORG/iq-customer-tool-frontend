import keyMirror from 'keymirror';

export default {
  ActionTypes: keyMirror({
    DRAW_NAV_TOGGLE_MENU: null,
    AUTH_LOGIN: null,
    AUTH_LOGIN_SUCCESS: null,
    AUTH_LOGIN_FAILURE: null,
    SYS_ALERT_CREATE: null,
    MODAL_OPEN: null,
    MODAL_CLOSE: null
  })
};