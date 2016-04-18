import { createSelector } from 'reselect';

export const getTriggers = state => state.entities.get('triggers').toJS();