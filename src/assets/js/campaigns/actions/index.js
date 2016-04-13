import Constants from '../Constants';
import { createAction } from 'redux-actions';
import { change } from 'redux-form/lib/actions';

const Actions = Constants.ActionTypes;

export const loadCampaignPrintCreate = createAction(Actions.CAMPAIGN_PRINT_CREATE_LOAD);
export const loadCampaignCreate = createAction(Actions.CAMPAIGN_CREATE_LOAD);
export const selectBrand = createAction(Actions.CAMPAIGN_CREATE_BRAND_SELECT);
export const selectCampaignType = createAction(Actions.CAMPAIGN_CREATE_CAMPAIGN_TYPE_SELECT);