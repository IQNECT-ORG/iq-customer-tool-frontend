import { createSelector } from 'reselect';
import { getCampaigns } from './entities/campaigns';

export const getAnalytics = state => state.analytics;
export const getFilteredCampaign = createSelector(
  getAnalytics,
  getCampaigns,
  (analytics, campaigns) => {
    return campaigns[analytics.filters.campaignId];
  }
);