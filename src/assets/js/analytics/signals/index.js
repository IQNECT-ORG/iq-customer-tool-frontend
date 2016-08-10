import { createAction } from 'redux-actions';

export const S_ANALYTICS_LOAD_OVERVIEW_PAGE = 'S_ANALYTICS_LOAD_OVERVIEW_PAGE';
export const S_ANALYTICS_FILTER_FORM_SUBMIT = 'S_ANALYTICS_FILTER_FORM_SUBMIT';
export const S_ANALYTICS_FILTERS_UPDATE = 'S_ANALYTICS_FILTERS_UPDATE';
export const S_ANALYTICS_DOWNLOAD_CSV = 'S_ANALYTICS_DOWNLOAD_CSV';

export const analyticsLoadOverviewPage = createAction(S_ANALYTICS_LOAD_OVERVIEW_PAGE);
export const analyticsFilterFormSubmit = createAction(S_ANALYTICS_FILTER_FORM_SUBMIT);
export const analyticsFiltersUpdate = createAction(S_ANALYTICS_FILTERS_UPDATE);
export const analyticsDownloadCSV = createAction(S_ANALYTICS_DOWNLOAD_CSV);