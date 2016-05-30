import { getJSON, buildURL } from 'redux-entity-crud/lib/api';
import config from 'app/core/config';

export const base = async function(params) {
  return await getJSON(`${config.API_ROOT}/searchlog/analytics`, params);
};

export const csv = async function(params) {
  let response = await fetch(
    buildURL(
      `${config.API_ROOT}/searchlog/analytics`,
      params
    ), {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'text/csv'
    }
  });
  return {
    text: await response.text(),
    response
  };
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