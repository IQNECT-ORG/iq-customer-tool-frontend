import queryString from 'query-string';
import _ from 'lodash';

function removeTrailingSlash(url) {
  if(_.endsWith(url, '/')) {
    return url.slice(0, -1);
  }
  return url;
};

function normalizeParams(params) {
  if(_.isString(params)) {
    return '?' + params;
  } else if(_.isObject(params)) {
    return '?' + queryString.stringify(params);
  } else {
    return '';
  }
};

async function fetcher(url, options) {
  // Remove trailing slash as it doesn't support it
  url = removeTrailingSlash(url);
  const params = normalizeParams(options.params);
  url = url + params;
  console.log(url);

  let response = await fetch(url, options);
  return {
    json: await response.json(),
    response
  };
};

export const fetchJSON = async function(url, overrideOptions) {
  let body;
  if(_.isString(overrideOptions.body)) {
    body = overrideOptions.body;
  } else {
    body = JSON.stringify(overrideOptions.body);
  }

  const options = _.defaultsDeep({}, overrideOptions, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body
  });

  return fetcher(url, options);
};

export const getJSON = async function(url, params) {
  return await fetchJSON(url, {
    method: 'GET',
    params
  });
};

export const createJSON = async function(url, data, params) {
  return await fetchJSON(url, {
    method: 'POST',
    params,
    body: data
  });
};

export const updateJSON = async function(url, data, params) {
  return await fetchJSON(url, {
    method: 'POST', // Because our current system does not support PUT ~_~
    params,
    body: data
  });
};

export const deleteJSON = async function(url, params) {
  return await fetchJSON(url, {
    method: 'DELETE',
    params
  });
};

//

export const fetchFormData = async function(url, overrideOptions) {
  const body = new FormData();
  _.each(overrideOptions.body, (value, key) => body.append(key, value));

  const options = _.defaultsDeep({}, overrideOptions, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    },
    body
  });

  return fetcher(url, options);
};

export const createFormData = async function(url, data, params) {
  return await fetchFormData(url, {
    method: 'POST',
    params,
    body: data
  });
};

export const updateFormData = async function(url, data, params) {
  return await fetchFormData(url, {
    method: 'POST',
    params,
    body: data
  });
};