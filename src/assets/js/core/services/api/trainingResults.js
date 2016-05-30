import { getJSON } from 'redux-entity-crud/lib/api';
import config from 'app/core/config';

export const get = async function(url, params) {
  return await getJSON(url, params);
};
