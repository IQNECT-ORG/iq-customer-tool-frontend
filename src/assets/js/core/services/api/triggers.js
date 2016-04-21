import { normalize, arrayOf } from 'normalizr';
import { trigger as triggerSchema } from './schemas';
import { getJSON } from './crud';

export const get = async function(id = '', params) {
  const parsePayload = (item) => {
    const newPayload = [];
    _.each(item.payload, (payload, index) => {
      newPayload.push({
        triggerPayloadId: _.uniqueId(),
        triggerId: item.triggerId,
        index
      });
    });

    item.payload = newPayload;
  };

  let { json, response } = await getJSON(`https://iq.api/api/trigger/${id}`, params);

  if(_.isArray(json)) {
    _.each(json, parsePayload);

    return {
      json: normalize(json, arrayOf(triggerSchema)),
      response
    };
  }

  parsePayload(json);

  return {
    json: normalize(json, triggerSchema),
    response
  };
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