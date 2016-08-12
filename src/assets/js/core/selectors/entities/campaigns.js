import { createSelector } from 'reselect';

export const getCampaigns = state => state.entities.campaigns;

export const getCampaignsOrderedByNewest = createSelector(
  getCampaigns,
  (campaigns) => {
    return _.orderBy(campaigns, 'createdTs', 'desc');
  }
);