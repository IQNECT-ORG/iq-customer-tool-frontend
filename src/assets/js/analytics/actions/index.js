import Constants from '../Constants';
import { createAction } from 'redux-actions';

const Actions = Constants.ActionTypes;

export const loadOverview = createAction(Actions.LOAD_ANALYTICS_OVERVIEW_PAGE);
export const filterFormSubmit = createAction(Actions.ANALYTICS_FILTER_FORM_SUBMIT);
export const filtersUpdate = createAction(Actions.ANALYTICS_FILTERS_UPDATE);
