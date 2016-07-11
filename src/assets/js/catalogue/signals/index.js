import { createAction } from 'redux-actions';

export const S_CATALOGUE_LOAD_BRAND_PAGE = 'S_CATALOGUE_LOAD_BRAND_PAGE';
export const S_CATALOGUE_LOAD_CAMPAIGN_PAGE = 'S_CATALOGUE_LOAD_CAMPAIGN_PAGE';
export const S_CATALOGUE_LOAD_COUPON_PAGE = 'S_CATALOGUE_LOAD_COUPON_PAGE';

export const catalogueLoadBrandPage = createAction(S_CATALOGUE_LOAD_BRAND_PAGE);
export const catalogueLoadCampaignPage = createAction(S_CATALOGUE_LOAD_CAMPAIGN_PAGE);
export const catalogueLoadCouponPage = createAction(S_CATALOGUE_LOAD_COUPON_PAGE);
