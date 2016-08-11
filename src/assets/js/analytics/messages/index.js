import { createAction } from 'redux-actions';

export const M_ANALYTICS_UPDATE_DATA_ALL_SEARCHES = 'M_ANALYTICS_UPDATE_DATA_ALL_SEARCHES';
export const M_ANALYTICS_UPDATE_FILTERS = 'M_ANALYTICS_UPDATE_FILTERS';

export const analyticsUpdateDataAllSearches = createAction(M_ANALYTICS_UPDATE_DATA_ALL_SEARCHES);
export const analyticsUpdateFilters = createAction(M_ANALYTICS_UPDATE_FILTERS);