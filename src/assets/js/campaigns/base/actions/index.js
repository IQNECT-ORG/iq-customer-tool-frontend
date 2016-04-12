import Constants from '../Constants';
import { createAction } from 'redux-actions';

const Actions = Constants.ActionTypes;

export const loadCampaignCreate = createAction(Actions.CAMPAIGN_CREATE_LOAD);
export const selectBrand = createAction(Actions.CAMPAIGN_CREATE_BRAND_SELECT);
export const selectCampaignType = createAction(Actions.CAMPAIGN_CREATE_CAMPAIGN_TYPE_SELECT);