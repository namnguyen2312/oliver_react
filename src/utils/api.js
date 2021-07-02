import fetch from 'isomorphic-fetch';

import appConfig from '../../config/app.json';

const TIMEOUT = 50000;

function bodyOf(requestPromise) {
  return requestPromise.then(res => res).catch((e) => { throw e; });
}

function url(path) {
  const rootUri = appConfig.app.API_ROOT.replace(/\/+$/, '');
  return rootUri + (path.indexOf('/') === 0 ? path : `/${path}`);
}

function getRequestHeaders(token) {
  const headers = { 'content-type': 'application/json' };

  if (token) {
    return { ...headers, authorization: `Bearer ${token}` };
  }

  return headers;
}

/**
 * Rejects a promise after `ms` number of milliseconds, it is still pending
 */
function timeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch(reject);
  });
}

/**
 * Constructs and fires a HTTP request
 */
function sendRequest(method, path, body) {
  const endpoint = url(path);
  // const tosken = document.cookie.split(';')[2].split('=')[1];
  const token = appConfig.token;
  // const token = localStorage.getItem('access_token');
  const headers = getRequestHeaders(token);
  const options = body
    ? { method, headers, body: JSON.stringify(body) }
    : { method, headers };

  return timeout(fetch(endpoint, options), TIMEOUT);
}

/**
 * Receives and reads a HTTP response
 */
function handleResponse(path, resJson) {
  return resJson.json();
}

/**
 * Make best effort to turn a HTTP error or a runtime exception to meaningful error log message
 */
function logError(error, endpoint, method) {
  if (error.status) {
    const summary = `(${error.status} ${error.statusText}): ${error}`;
    // eslint-disable-next-line
    console.error(`API request ${method.toUpperCase()} ${endpoint} responded with ${summary}`);
  }
  else {
    // eslint-disable-next-line
    console.error(`API request ${method.toUpperCase()} ${endpoint} failed with message "${error.message}"`);
  }
}

/**
 * Make arbitrary fetch request to a path relative to API root url
 * @param {String} method One of: get|post|put|delete
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 */
function request(method, path, body, suppressRedBox) {
  return sendRequest(method, path, body)
    .then(resJson => handleResponse(path, resJson))
    .catch((error) => {
      if (!suppressRedBox) {
        logError(error, url(path), method);
      }
      throw error;
    });
}

/**
 * GET a path relative to API root url.
 * @param {String}  path Relative path to the configured API endpoint
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise} of response body
 */
export function get(path, suppressRedBox) {
  return bodyOf(request('get', path, null, suppressRedBox));
}

/**
 * POST JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise}  of response body
 */
export function post(path, body, suppressRedBox) {
  return bodyOf(request('post', path, body, suppressRedBox));
}

/**
 * PUT JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise}  of response body
 */
export function put(path, body, suppressRedBox) {
  return bodyOf(request('put', path, body, suppressRedBox));
}

/**
 * DELETE a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise}  of response body
 */
export function del(path, suppressRedBox) {
  return bodyOf(request('delete', path, null, suppressRedBox));
}
