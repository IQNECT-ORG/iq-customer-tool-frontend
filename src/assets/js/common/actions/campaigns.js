import Constants from '../Constants';
import { createAction } from 'redux-actions';

const Actions = Constants.ActionTypes;

export const createCampaign = createAction(Actions.CAMPAIGN_CREATE_REQUEST);
export const createCampaignSuccess = createAction(Actions.CAMPAIGN_CREATE_SUCCESS);
export const createCampaignFailure = createAction(Actions.CAMPAIGN_CREATE_FAILURE);

export const fetchCampaigns = createAction(Actions.CAMPAIGN_FETCH_REQUEST);
export const fetchCampaignsSuccess = createAction(Actions.CAMPAIGN_FETCH_SUCCESS);
export const fetchCampaignsFailure = createAction(Actions.CAMPAIGN_FETCH_FAILURE);

export const deleteCampaign = createAction(Actions.CAMPAIGN_DELETE_REQUEST);
export const deleteCampaignSuccess = createAction(Actions.CAMPAIGN_DELETE_SUCCESS);
export const deleteCampaignFailure = createAction(Actions.CAMPAIGN_DELETE_FAILURE);
