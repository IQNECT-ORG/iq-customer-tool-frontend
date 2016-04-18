import _ from 'lodash';
import { normalize, arrayOf } from 'normalizr';
import * as schemas from './schemas';

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

    return normalize(await response.json(), schemas.campaign);
  } catch(err) {
    throw err;
  }
};

export const get = async function(data) {
  try {
    let response = await fetch('https://iq.api/api/campaign', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return normalize(await response.json(), arrayOf(schemas.campaign));
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