import { normalize, arrayOf } from 'normalizr';
import * as schemas from './schemas';

export const get = async function() {
  try {
    let response = await fetch('https://iq.api/api/brand', {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return {
      json: normalize(await response.json(), arrayOf(schemas.brand)),
      response
    };
  } catch(err) {
    throw err;
  }
};

export const create = async function(data) {
  const body = new FormData();
  _.each(data, (value, key) => body.append(key, value));

  try {
    let response = await fetch('https://iq.api/api/brand', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      },
      body: body,
    });

    return normalize(await response.json(), schemas.brand);
  } catch(err) {
    throw err;
  }
};