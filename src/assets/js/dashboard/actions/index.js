import Constants from '../Constants';
import { createAction } from 'redux-actions';
import { change } from 'redux-form/lib/actions';

const Actions = Constants.ActionTypes;

// Pages
export const loadDashboardPage = createAction(Actions.LOAD_DASHBOARD_PAGE);
