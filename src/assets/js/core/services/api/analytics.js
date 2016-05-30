import { getJSON } from 'redux-entity-crud/lib/api';
import config from 'app/core/config';

export const base = async function(params) {
  return await getJSON(`${config.API_ROOT}/searchlog/analytics`, params);
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