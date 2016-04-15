import { Schema, arrayOf } from 'normalizr';

export const brand = new Schema('brands', {
  idAttribute: 'brandId'
});

export const campaign = new Schema('campaigns', {
  idAttribute: 'campaignId'
});