import keyMirror from 'keymirror';

export default {
  ActionTypes: keyMirror({
    LOAD_DASHBOARD_PAGE: null,

    DASHBOARD_UPDATE_CAMPAIGNS_COUNT: null,
    DASHBOARD_UPDATE_TRIGGERS_COUNT: null,
    DASHBOARD_UPDATE_MATCHES_COUNT: null,
    DASHBOARD_UPDATE_TOP_BRANDS: null,
  })
};