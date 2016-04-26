import { normalize, arrayOf } from 'normalizr';
import { trigger as triggerSchema } from './schemas';
import { getJSON } from './crud';

export const get = async function(id = '', params) {
  return await getJSON(`https://iq.api/api/trigger/${id}`, params);
};

export const create = async function(data) {
  const body = new FormData();
  _.each(data, (value, key) => body.append(key, value));

  try {
    let response = await fetch('https://iq.api/api/trigger', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      },
      body: body,
    });

    return {
      json: normalize(await response.json(), triggerSchema),
      response
    };
  } catch(err) {
    throw err;
  }
};

export const update = async function(id, data) {
    try {
    let response = await fetch('https://iq.api/api/trigger', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    let triggers = await response.json();
    return normalize(triggers, arrayOf(triggerSchema));
  } catch(err) {
    throw err;
  }
};