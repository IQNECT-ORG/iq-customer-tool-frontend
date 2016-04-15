import { Schema, arrayOf } from 'normalizr';

export const brand = new Schema('brands', {
  idAttribute: 'brandId'
});