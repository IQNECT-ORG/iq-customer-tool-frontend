import { createSelector } from 'reselect';

export const getUI = state => state.ui.toJS();