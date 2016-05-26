import keyMirror from 'keymirror';

export default {
  ActionTypes: keyMirror({
    DRAW_NAV_TOGGLE_MENU: null,

    // Alert Messages
    ALERT_MESSAGE_READ: null,
    
    // Previews
    PREVIEW_JOB_REQUEST_SUCCESS: null,
    PREVIEW_JOB_STATUS_SUCCESS: null,
    
    // Brands
    BRANDS_FETCH_REQUEST: null,
    BRANDS_FETCH_SUCCESS: null,
    BRANDS_FETCH_FAILURE: null,

    BRANDS_CREATE_REQUEST: null,
    BRANDS_CREATE_SUCCESS: null,
    BRANDS_CREATE_FAILURE: null,

    BRANDS_UPDATE_REQUEST: null,
    BRANDS_UPDATE_SUCCESS: null,
    BRANDS_UPDATE_FAILURE: null,

    BRANDS_DELETE_REQUEST: null,
    BRANDS_DELETE_SUCCESS: null,
    BRANDS_DELETE_FAILURE: null,

    BRAND_ADD_FORM_SUBMIT: null,
    BRAND_EDIT_FORM_SUBMIT: null,
    
    // Campaigns
    CAMPAIGN_CREATE_REQUEST: null,
    CAMPAIGN_CREATE_SUCCESS: null,
    CAMPAIGN_CREATE_FAILURE: null,

    CAMPAIGN_FETCH_REQUEST: null,
    CAMPAIGN_FETCH_SUCCESS: null,
    CAMPAIGN_FETCH_FAILURE: null,

    CAMPAIGN_DELETE_REQUEST: null,
    CAMPAIGN_DELETE_SUCCESS: null,
    CAMPAIGN_DELETE_FAILURE: null,
    
    // Triggers
    TRIGGERS_FETCH_REQUEST: null,
    TRIGGERS_FETCH_SUCCESS: null,
    TRIGGERS_FETCH_FAILURE: null,

    TRIGGER_UPDATE_REQUEST: null,
    TRIGGER_UPDATE_SUCCESS: null,
    TRIGGER_UPDATE_FAILURE: null,

    // Training Results
    TRAINING_RESULTS_FETCH_REQUEST: null,
    TRAINING_RESULTS_FETCH_SUCCESS: null,
    TRAINING_RESULTS_FETCH_FAILURE: null,

    // Coupons
    COUPON_CREATE_FORM_SUBMIT: null,
    COUPON_EDIT_FORM_SUBMIT: null,

    COUPONS_FETCH_REQUEST: null,
    COUPONS_FETCH_SUCCESS: null,
    COUPONS_FETCH_FAILURE: null,

    COUPONS_CREATE_REQUEST: null,
    COUPONS_CREATE_SUCCESS: null,
    COUPONS_CREATE_FAILURE: null,

    COUPONS_UPDATE_REQUEST: null,
    COUPONS_UPDATE_SUCCESS: null,
    COUPONS_UPDATE_FAILURE: null,

    COUPONS_DELETE_REQUEST: null,
    COUPONS_DELETE_SUCCESS: null,
    COUPONS_DELETE_FAILURE: null,

    // Modals / Pages
    LOAD_BROWSE_COUPONS_MODAL: null,
  }),

  CampaignTypes: {
    IMAGE: 0,
    PDF: 1,
    VIDEO: 2,
  },

  TriggerTypes: {
    KEYWORD: 0,
    IMAGE: 1,
    BARCODE: 2,
    QR: 3,
    VIDEO: 4,
    BEACON: 5,
    PDF: 6,
  },

  TrainingResultStatuses: {
    OK: 0
  }
};