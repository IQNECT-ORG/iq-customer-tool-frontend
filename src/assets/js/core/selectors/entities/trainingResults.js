import { createSelector } from 'reselect';

export const getTrainingResults = state => state.entities.get('trainingResults').toJS();