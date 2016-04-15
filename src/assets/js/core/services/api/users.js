
export const forgottenPassword = async function(data) {
  try {
    let response = await fetch('https://iq.api/api/user/reset-password', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch(err) {
    throw err;
  }
};

export const resetPassword = async function(data) {
  try {
    let response = await fetch('https://iq.api/api/user/new-password', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch(err) {
    throw err;
  }
}