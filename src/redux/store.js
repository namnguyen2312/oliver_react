/**
 * App store
 * @module  redux/store
 */

import { applyMiddleware, compose, createStore } from 'redux';

import middlewares from './middleware';
import appReducer from './reducers';

const configureStore = compose(
  applyMiddleware(...middlewares)
)(createStore)(appReducer);

export default configureStore;
