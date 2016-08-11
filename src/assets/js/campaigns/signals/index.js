import { createAction } from 'redux-actions';

// Pages
export const S_CAMPAIGN_LOAD_CREATE_PAGE = 'S_CAMPAIGN_LOAD_CREATE_PAGE';
export const S_CAMPAIGN_LOAD_PRINT_CREATE_PAGE = 'S_CAMPAIGN_LOAD_PRINT_CREATE_PAGE';
export const S_CAMPAIGN_LOAD_EDIT_PAGE = 'S_CAMPAIGN_LOAD_EDIT_PAGE';

export const campaignLoadCreatePage = createAction(S_CAMPAIGN_LOAD_CREATE_PAGE);
export const campaignLoadPrintCreatePage = createAction(S_CAMPAIGN_LOAD_PRINT_CREATE_PAGE);
export const campaignLoadEditPage = createAction(S_CAMPAIGN_LOAD_EDIT_PAGE);

// Modals
export const S_CAMPAIGN_LOAD_COUPON_BROWSER_MODAL = 'S_CAMPAIGN_LOAD_COUPON_BROWSER_MODAL';

export const campaignLoadCouponBrowserModal = createAction(S_CAMPAIGN_LOAD_COUPON_BROWSER_MODAL);

// Selections / resets
export const S_CAMPAIGN_SELECT_BRAND = 'S_CAMPAIGN_SELECT_BRAND';
export const S_CAMPAIGN_SELECT_CAMPAIGN_TYPE = 'S_CAMPAIGN_SELECT_CAMPAIGN_TYPE';
export const S_CAMPAIGN_SELECT_COUPON = 'S_CAMPAIGN_SELECT_COUPON';
export const S_CAMPAIGN_RESET_CREATE = 'S_CAMPAIGN_RESET_CREATE';

export const campaignSelectBrand = createAction(S_CAMPAIGN_SELECT_BRAND);
export const campaignSelectCampaignType = createAction(S_CAMPAIGN_SELECT_CAMPAIGN_TYPE);
export const campaignSelectCoupon = createAction(S_CAMPAIGN_SELECT_COUPON);
export const campaignResetCreate = createAction(S_CAMPAIGN_RESET_CREATE);

// Forms
export const S_CAMPAIGN_PDF_FORM_SUBMIT = 'S_CAMPAIGN_PDF_FORM_SUBMIT';
export const S_CAMPAIGN_IMAGE_FORM_SUBMIT = 'S_CAMPAIGN_IMAGE_FORM_SUBMIT';
export const S_CAMPAIGN_VIDEO_FORM_SUBMIT = 'S_CAMPAIGN_VIDEO_FORM_SUBMIT';
export const S_CAMPAIGN_PDF_SUMMARY_FORM_SUBMIT = 'S_CAMPAIGN_PDF_SUMMARY_FORM_SUBMIT';

export const campaignPDFFormSubmit = createAction(S_CAMPAIGN_PDF_FORM_SUBMIT);
export const campaignImageFormSubmit = createAction(S_CAMPAIGN_IMAGE_FORM_SUBMIT);
export const campaignVideoFormSubmit = createAction(S_CAMPAIGN_VIDEO_FORM_SUBMIT);
export const campaignPDFSummaryFormSubmit = createAction(S_CAMPAIGN_PDF_SUMMARY_FORM_SUBMIT);
