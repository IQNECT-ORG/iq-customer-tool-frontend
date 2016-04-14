function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

async function parseJSON(response) {
  return response.json();
}


export const createSession = async function(data) {
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

    return await parseJSON(response);
  } catch(err) {
    throw err;
  }
};