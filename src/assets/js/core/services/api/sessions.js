import { createJSON, getJSON, deleteJSON } from 'redux-entity-crud/lib/api';
import config from 'app/core/config';

export const get = async function(params) {
  return await getJSON(`${config.API_ROOT}/session`, params);
};

export const create = async function(data, params) {
  return await createJSON(`${config.API_ROOT}/session`, data, params);
};

export const del = async function(id = '', params) {
  return await deleteJSON(`${config.API_ROOT}/session/${id}`, params);
};
