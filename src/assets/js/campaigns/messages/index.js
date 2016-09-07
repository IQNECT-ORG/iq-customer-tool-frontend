import { createAction } from 'redux-actions';

export const M_CAMPAIGN_CREATE_RESET = 'M_CAMPAIGN_CREATE_RESET';
export const M_CAMPAIGN_CREATE_SELECT_BRAND = 'M_CAMPAIGN_CREATE_SELECT_BRAND';
export const M_CAMPAIGN_CREATE_SELECT_CAMPAIGN_TYPE = 'M_CAMPAIGN_CREATE_SELECT_CAMPAIGN_TYPE';

export const campaignCreateReset = createAction(M_CAMPAIGN_CREATE_RESET);
export const campaignCreateSelectBrand = createAction(M_CAMPAIGN_CREATE_SELECT_BRAND);
export const campaignCreateSelectCampaignType = createAction(M_CAMPAIGN_CREATE_SELECT_CAMPAIGN_TYPE);