import { normalize, arrayOf } from 'normalizr';
import { getJSON } from './crud';
import _ from 'lodash';

export const get = async function(url, params) {
  return await getJSON(url, params);
};
