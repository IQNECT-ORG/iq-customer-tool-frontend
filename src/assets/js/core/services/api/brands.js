import { getJSON, createFormData, updateFormData, deleteJSON } from './crud';

export const get = async function(id = '', params) {
  return await getJSON(`https://iq.api/api/brand/${id}`, params);
};

export const create = async function(data, params) {
  return await createFormData('https://iq.api/api/brand', data, params);
};

export const update = async function(data, params) {
  return await updateFormData('https://iq.api/api/brand', data, params);
};

export const delete = async function(id = '', params) {
  return await deleteJSON(`https://iq.api/api/brand/${id}`, params);
};
