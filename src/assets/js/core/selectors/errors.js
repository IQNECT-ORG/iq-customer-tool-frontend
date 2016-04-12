import { createSelector } from 'reselect';

export const getErrors = state => state.errors.toJS();