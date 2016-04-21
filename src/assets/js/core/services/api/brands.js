import { normalize, arrayOf } from 'normalizr';
import { brand as brandSchema } from './schemas';
import { getJSON } from './crud';

export const filter = async function(params) {
  let { json, response } = await getJSON(`https://iq.api/api/brand`, params);

  return {
    json: normalize(json, arrayOf(brandSchema)),
    response
  };
};

export const find = async function(id, params) {
  let { json, response } = await getJSON(`https://iq.api/api/brand/${id}`, params);

  return {
    json: normalize(json, brandSchema),
    response
  };
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

    return normalize(await response.json(), brandSchema);
  } catch(err) {
    throw err;
  }
};