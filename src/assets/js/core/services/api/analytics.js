import { getJSON } from 'redux-entity-crud/lib/api';

export const base = async function(params) {
  return await getJSON(`https://iq.api/api/searchlog/analytics`, params);
};

export const countSearches = async function(params) {
  return await base({
    'types[countSearches]': null
  });
};

export const topBrands = async function(params) {
  return await base({
    'types[topBrands]': null
  });
};