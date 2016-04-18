import { normalize, arrayOf } from 'normalizr';
import * as schemas from './schemas';
import _ from 'lodash';

export const getByRaw = async function(raw, triggerId) {
  try {
    let response = await fetch(raw, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    let result = await response.json();

    _.each(result, item => {
      item.trainingResultId = _.uniqueId();
      item.triggerId = triggerId;
    });

    return normalize(result, arrayOf(schemas.trainingResult));
  } catch(err) {
    throw err;
  }
};