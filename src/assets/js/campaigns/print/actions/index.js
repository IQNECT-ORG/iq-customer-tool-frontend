import Constants from '../Constants';
import { createAction } from 'redux-actions';
import { change } from 'redux-form/lib/actions';

const Actions = Constants.ActionTypes;

export const loadCampaignPrintCreate = createAction(Actions.CAMPAIGN_PRINT_CREATE_LOAD);