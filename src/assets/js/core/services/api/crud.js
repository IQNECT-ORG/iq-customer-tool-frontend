import queryString from 'query-string';
import _ from 'lodash';

export function removeTrailingSlash(url) {
  if(_.endsWith(url, '/')) {
    return url.slice(0, -1);
  }
  return url;
};

export function normalizeParams(params) {
  if(_.isString(params)) {
    return '?' + params;
  } else if(_.isObject(params)) {
    return '?' + queryString.stringify(params);
  } else {
    return '';
  }
};

export function buildURL(url, parma) {
  // Remove trailing slash as it doesn't support it
  return removeTrailingSlash(url) + normalizeParams(params);
}

export async function fetcher(url, options) {
  let response = await fetch(buildURL(url, options.params), options);
  return {
    json: await response.json(),
    response
  };
};

// JSON

export const serializeJSONBody = function(body) {
  if(_.isString(body)) {
    return body;
  } else {
    return JSON.stringify(body);
  }
}

export const fetchJSON = async function(url, overrideOptions) {
  const options = _.defaultsDeep({
    body: serializeJSONBody(overrideOptions.body)
  }, overrideOptions, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
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

// FormData

export const serializeFormDataBody = function(data) {
  let formData = new FormData();

  _.forOwn(data, (value, key) => {
    formData.set(key, value)
  });

  return formData;
};

export const fetchFormData = async function(url, overrideOptions) {
  const options = _.defaultsDeep({
    body: serializeFormDataBody(overrideOptions.body)
  }, overrideOptions, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
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