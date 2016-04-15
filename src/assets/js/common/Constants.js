import keyMirror from 'keymirror';

export default {
  ActionTypes: keyMirror({
    DRAW_NAV_TOGGLE_MENU: null,
    // Previews
    PREVIEW_JOB_REQUEST_SUCCESS: null,
    PREVIEW_JOB_STATUS_SUCCESS: null,
    // Brands
    BRANDS_FETCH_REQUEST: null,
    BRANDS_FETCH_SUCCESS: null,
    BRANDS_FETCH_FAILURE: null,
    //Campaigns
    CAMPAIGN_CREATE_REQUEST: null,
    CAMPAIGN_CREATE_SUCCESS: null,
    CAMPAIGN_CREATE_FAILURE: null,
    CAMPAIGN_FETCH_REQUEST: null,
    CAMPAIGN_FETCH_SUCCESS: null,
    CAMPAIGN_FETCH_FAILURE: null,
    CAMPAIGN_DELETE_REQUEST: null,
    CAMPAIGN_DELETE_SUCCESS: null,
    CAMPAIGN_DELETE_FAILURE: null,
  }),

  CampaignTypes: {
    IMAGE: 1,
    VIDEO: 4,
    PDF: 6
  }
};