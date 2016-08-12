import { createSelector } from 'reselect';

export const getCoupons = state => state.entities.coupons;

export const getCouponsOrderedByNewest = createSelector(
  getCoupons,
  (coupons) => {
    return _.orderBy(coupons, 'createdTs', 'desc');
  }
);