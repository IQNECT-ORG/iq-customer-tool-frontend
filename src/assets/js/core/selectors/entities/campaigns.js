import { createSelector } from 'reselect';

export const getCampaigns = state => state.entities.get('campaigns').toJS();