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

    let brands = await response.json();
    return normalize(brands, arrayOf(schemas.trigger));
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

    return normalize(await response.json(), arrayOf(schemas.trigger));
  } catch(err) {
    throw err;
  }
};