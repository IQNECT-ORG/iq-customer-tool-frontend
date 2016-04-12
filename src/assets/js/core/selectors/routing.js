import { createSelector } from 'reselect';

export const getRouting = state => state.routing;
export const getPathname = state => getRouting(state).locationBeforeTransitions.pathname;