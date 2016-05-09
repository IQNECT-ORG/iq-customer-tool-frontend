import { createJSON, getJSON } from 'redux-entity-crud/lib/api';

export const get = async function(params) {
  return await getJSON('https://iq.api/api/session', params);
};

export const create = async function(data, params) {
  return await createJSON('https://iq.api/api/session', data, params);
};
