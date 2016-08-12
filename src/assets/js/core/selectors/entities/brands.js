import { createSelector } from 'reselect';
import _ from 'lodash';

export const getBrands = state => state.entities.brands;

export const getBrandsOrderedByNewest = createSelector(
  getBrands,
  (brands) => {
    return _.orderBy(brands, 'createdTs', 'desc');
  }
);