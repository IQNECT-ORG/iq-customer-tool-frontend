import { createSelector } from 'reselect';

export const getRouting = state => state.routing;
export const getPathname = state => {
  return getRouting(state).locationBeforeTransitions.pathname;
}