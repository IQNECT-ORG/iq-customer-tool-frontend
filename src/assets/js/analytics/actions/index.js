import Constants from '../Constants';
import { createAction } from 'redux-actions';
import { change } from 'redux-form/lib/actions';

const Actions = Constants.ActionTypes;

export const loadOverview = createAction(Actions.LOAD_ANALYTICS_OVERVIEW_PAGE);
