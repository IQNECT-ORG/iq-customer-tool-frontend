import Constants from '../Constants';
import { createAction } from 'redux-actions';
import { change } from 'redux-form/lib/actions';

const Actions = Constants.ActionTypes;

// Pages
export const loadCampaignCreatePage = createAction(Actions.LOAD_CAMPAIGN_CREATE_PAGE);
export const loadCampaignPrintCreatePage = createAction(Actions.LOAD_CAMPAIGN_PRINT_CREATE_PAGE);
export const loadCampaignEditPage = createAction(Actions.LOAD_CAMPAIGN_EDIT_PAGE);

// Modals
export const loadCampaignCouponBrowserModal = createAction(Actions.LOAD_CAMPAIGN_COUPON_BROWSER_MODAL);

// Selections / resets
export const selectBrand = createAction(Actions.CAMPAIGN_CREATE_BRAND_SELECT);
export const selectCampaignType = createAction(Actions.CAMPAIGN_CREATE_CAMPAIGN_TYPE_SELECT);
export const selectCoupon = createAction(Actions.CAMPAIGN_SELECT_COUPON);
export const resetCampaignCreate = createAction(Actions.CAMPAIGN_CREATE_RESET);

// Forms
export const pdfCampaignFormSubmit = createAction(Actions.CAMPAIGN_PDF_FORM_SUBMIT);
export const imageCampaignFormSubmit = createAction(Actions.CAMPAIGN_IMAGE_FORM_SUBMIT);
export const videoCampaignFormSubmit = createAction(Actions.CAMPAIGN_VIDEO_FORM_SUBMIT);
export const pdfCampaignSummaryFormSubmit = createAction(Actions.CAMPAIGN_PDF_SUMMARY_FORM_SUBMIT);