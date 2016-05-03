import { normalize, arrayOf } from 'normalizr';
import { getJSON } from 'redux-entity-crud/lib/api';
import _ from 'lodash';

export const get = async function(url, params) {
  return await getJSON(url, params);
};
