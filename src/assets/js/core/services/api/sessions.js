import { createJSON, getJSON } from 'redux-entity-crud/lib/api';
import config from 'app/core/config';

export const get = async function(params) {
  return await getJSON(`${config.API_ROOT}/session`, params);
};

export const create = async function(data, params) {
  return await createJSON(`${config.API_ROOT}/session`, data, params);
};
