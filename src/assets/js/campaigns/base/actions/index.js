import Constants from '../Constants';
import { createAction } from 'redux-actions';

const Actions = Constants.ActionTypes;

export const loadCampaignCreate = createAction(Actions.CAMPAIGN_PRINT_LOAD);