import { createSelector } from 'reselect';

export const getBrands = state => state.entities.get('brands').toJS();