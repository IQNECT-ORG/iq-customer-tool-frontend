import { normalize, arrayOf } from 'normalizr';
import * as schemas from './schemas';
import queryString from 'query-string';

export const get = async function() {
  try {
    let response = await fetch('https://iq.api/api/trigger', {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    let triggers = await response.json();
    return normalize(triggers, arrayOf(schemas.trigger));
  } catch(err) {
    throw err;
  }
};

export const getByCampaign = async function(campaignId) {
  const params = queryString.stringify({
    campaignId
  });

  try {
    let response = await fetch(`https://iq.api/api/trigger?${params}`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    let result = await response.json();

    _.each(result, (item, index) => {
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

    return normalize(result, arrayOf(schemas.trigger));
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
    return normalize(triggers, arrayOf(schemas.trigger));
  } catch(err) {
    throw err;
  }
};