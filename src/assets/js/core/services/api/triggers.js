import { getJSON, createFormData, updateFormData, deleteJSON } from 'redux-entity-crud/lib/api';

export const get = async function(id = '', params) {
  return await getJSON(`https://iq.api/api/trigger/${id}`, params);
};

export const create = async function(data, params) {
  return await createFormData('https://iq.api/api/trigger', data, params);
};

export const update = async function(id, data, params) {
  return await updateFormData(`https://iq.api/api/trigger/${id}`, data, params);
};

export const del = async function(id = '', params) {
  return await deleteJSON(`https://iq.api/api/trigger/${id}`, params);
};

export const count = async function(params) {
  return await getJSON(`https://iq.api/api/trigger/count`, params);
};