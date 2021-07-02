/**
 * App middleware
 * @module  redux/middleware
 */

import thunkMiddleware from 'redux-thunk';

const middlewares = [
  thunkMiddleware
];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-logger')());      // eslint-disable-line global-require
  middlewares.push(require('./middlewares/perf'));  // eslint-disable-line global-require
}

export default middlewares;
