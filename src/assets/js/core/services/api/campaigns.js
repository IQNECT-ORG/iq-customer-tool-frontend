import _ from 'lodash';

export const create = async function(data) {
  const body = new FormData();
  _.each(data, (value, key) => body.append(key, value));

  try {
    let response = await fetch('https://iq.api/api/campaign', {
      method: 'POST',
      credentials: 'include',
      headers: {
      },
      body: body,
    });

    return await response.json();
  } catch(err) {
    throw err;
  }
};