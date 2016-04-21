import { normalize, arrayOf } from 'normalizr';
import { trigger as triggerSchema } from './schemas';
import { getJSON } from './crud';

export const filter = async function(params) {
  let { json, response } = await getJSON(`https://iq.api/api/trigger`, params);

  _.each(json, (item, index) => {
    const newPayload = [];
    _.each(item.payload, (payload, index) => {
      newPayload.push({
        triggerPayloadId: _.uniqueId(),
        triggerId: item.triggerId,
        index
      });
    });

    item.payload = newPayload;
  });

  return {
    json: normalize(json, arrayOf(triggerSchema)),
    response
  };
};

export const find = async function(id, params) {
  let { json, response } = await getJSON(`https://iq.api/api/trigger/${id}`, params);

  //_.each(json, (item, index) => {
  const newPayload = [];
  _.each(json.payload, (payload, index) => {
    newPayload.push({
      triggerPayloadId: _.uniqueId(),
      triggerId: json.triggerId,
      index
    });
  });

  json.payload = newPayload;
  //});

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
    return normalize(triggers, arrayOf(schemas.trigger));
  } catch(err) {
    throw err;
  }
};