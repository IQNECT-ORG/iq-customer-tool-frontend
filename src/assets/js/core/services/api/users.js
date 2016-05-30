import config from 'app/core/config';

export const forgottenPassword = async function(data) {
  try {
    let response = await fetch(`${config.API_ROOT}/user/reset-password`, {
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
    let response = await fetch(`${config.API_ROOT}/user/new-password`, {
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