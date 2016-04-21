import queryString from 'query-string';
import _ from 'lodash';

export const fetchJSON = async function(url, overrideOptions) {
  let body;
  if(_.isString(overrideOptions.body)) {
    body = overrideOptions.body;
  } else {
    body = JSON.stringify(overrideOptions.body);
  }

  let params = '';
  if(_.isString(overrideOptions.params)) {
    params = '?' + overrideOptions.params;
  } else if(_.isObject(overrideOptions.params)) {
    params = queryString.stringify(overrideOptions.params);
  }

  url = url + params;

  const options = _.defaultsDeep({}, overrideOptions, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: body
  });

  try {
    let response = await fetch(url, options);
    return {
      json: await response.json(),
      response
    };
  } catch(err) {
    throw err;
  }
};

export const getJSON = async function(url, params) {
  return await fetchJSON(url, {
    method: 'GET',
    params
  });
};

// export const create = async function(data) {
//   const body = new FormData();
//   _.each(data, (value, key) => body.append(key, value));

//   try {
//     let response = await fetch('https://iq.api/api/brand', {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Accept': 'application/json'
//       },
//       body: body,
//     });

//     return normalize(await response.json(), schemas.brand);
//   } catch(err) {
//     throw err;
//   }
// };