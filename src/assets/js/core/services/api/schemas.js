import { Schema, arrayOf } from 'normalizr';

export const brand = new Schema('brands', {
  idAttribute: 'brandId'
});

export const campaign = new Schema('campaigns', {
  idAttribute: 'campaignId'
});

export const trigger = new Schema('triggers', {
  idAttribute: 'triggerId'
});

export const trainingResult = new Schema('trainingResults', {
  idAttribute: 'trainingResultId'
});

export const triggerPayload = new Schema('triggerPayloads', {
  idAttribute: 'triggerPayloadId'
});

// Definitions
trigger.define({
  payload: arrayOf(triggerPayload)
});