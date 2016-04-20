
export const create = async function(data) {
  try {
    let response = await fetch('https://iq.api/api/session', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    return {
      json: await response.json(),
      response
    };
  } catch(err) {
    throw err;
  }
};