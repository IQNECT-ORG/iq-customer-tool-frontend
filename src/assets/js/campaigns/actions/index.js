import Constants from '../Constants';
import { createAction } from 'redux-actions';
import { change } from 'redux-form/lib/actions';

const Actions = Constants.ActionTypes;

export const loadCampaignCreatePage = createAction(Actions.LOAD_CAMPAIGN_CREATE_PAGE);
export const loadCampaignPrintCreatePage = createAction(Actions.LOAD_CAMPAIGN_PRINT_CREATE_PAGE);

export const selectBrand = createAction(Actions.CAMPAIGN_CREATE_BRAND_SELECT);
export const selectCampaignType = createAction(Actions.CAMPAIGN_CREATE_CAMPAIGN_TYPE_SELECT);
export const resetCampaignCreate = createAction(Actions.CAMPAIGN_CREATE_RESET);