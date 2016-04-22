import _ from 'lodash';
import { normalize, arrayOf } from 'normalizr';
import * as schemas from './schemas';
import { getJSON } from './crud';

export const get = async function(id = '', params) {
  return await getJSON(`https://iq.api/api/campaign/${id}`, params);
};

export const create = async function(data) {
  const body = new FormData();
  _.each(data, (value, key) => body.append(key, value));

  try {
    let response = await fetch('https://iq.api/api/campaign', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      },
      body: body,
    });

    return {
      json: normalize(await response.json(), schemas.campaign),
      response
    };
  } catch(err) {
    throw err;
  }
};

export const del = async function(id) {
  try {
    let response = await fetch(`https://iq.api/api/campaign/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return await response.json();
  } catch(err) {
    throw err;
  }
};