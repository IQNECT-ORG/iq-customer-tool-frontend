import { createAction } from 'redux-actions';

export const M_DASHBOARD_UPDATE_MATCHES_COUNT = 'M_DASHBOARD_UPDATE_MATCHES_COUNT';
export const M_DASHBOARD_UPDATE_TOP_BRANDS = 'M_DASHBOARD_UPDATE_TOP_BRANDS';
export const M_DASHBOARD_UPDATE_CAMPAIGNS_COUNT = 'M_DASHBOARD_UPDATE_CAMPAIGNS_COUNT';
export const M_DASHBOARD_UPDATE_TRIGGERS_COUNT = 'M_DASHBOARD_UPDATE_TRIGGERS_COUNT';

export const dashboardUpdateMatchesCount = createAction(M_DASHBOARD_UPDATE_MATCHES_COUNT);
export const dashboardUpdateTopBrands = createAction(M_DASHBOARD_UPDATE_TOP_BRANDS);
export const dashboardUpdateCampaignsCount = createAction(M_DASHBOARD_UPDATE_CAMPAIGNS_COUNT);
export const dashboardUpdateTriggersCount = createAction(M_DASHBOARD_UPDATE_TRIGGERS_COUNT);