import keyMirror from 'keymirror';

export default {
  ActionTypes: keyMirror({
    DRAW_NAV_TOGGLE_MENU: null,
    PREVIEW_JOB_REQUEST_SUCCESS: null,
    PREVIEW_JOB_STATUS_SUCCESS: null,
    BRANDS_FETCH_REQUEST: null,
    BRANDS_FETCH_SUCCESS: null,
    BRANDS_FETCH_FAILURE: null
  }),

  CampaignTypes: {
    IMAGE: 1,
    VIDEO: 4,
    PDF: 6
  }
};