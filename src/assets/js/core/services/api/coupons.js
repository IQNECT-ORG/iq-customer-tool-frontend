import { getJSON, createFormData, updateFormData, deleteJSON } from 'redux-entity-crud/lib/api';
import config from 'app/core/config';

export const get = async function(id = '', params) {
  return await getJSON(`${config.API_ROOT}/coupon/${id}`, params);
};

export const create = async function(data, params) {
  return await createFormData(`${config.API_ROOT}/coupon`, data, params);
};

export const update = async function(id, data, params) {
  return await updateFormData(`${config.API_ROOT}/coupon/${id}`, data, params);
};

export const del = async function(id = '', params) {
  return await deleteJSON(`${config.API_ROOT}/coupon/${id}`, params);
};
