import { getJSON, createFormData, updateFormData, deleteJSON } from 'redux-entity-crud/lib/api';
import config from 'app/core/config';

export const get = async function(id = '', params) {
  return await getJSON(`${config.API_ROOT}/campaign/${id}`, params);
};

export const create = async function(data, params) {
  return await createFormData(`${config.API_ROOT}/campaign`, data, params);
};

export const update = async function(id, data, params) {
  return await updateFormData(`${config.API_ROOT}/campaign/${id}`, data, params);
};

export const del = async function(id = '', params) {
  return await deleteJSON(`${config.API_ROOT}/campaign/${id}`, params);
};

export const count = async function(params) {
  return await getJSON(`${config.API_ROOT}/campaign/count`, params);
};