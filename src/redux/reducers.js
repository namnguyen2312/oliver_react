/**
 * App reducers
 * @module  redux/reducers
 */

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import createReducer from '../utils/reducer-factory';
import appConfig from '../../config/app.json';

// Create a collection of child reducers for population
const childReducers = [];

// Add core reducers
childReducers.router = routerReducer;
childReducers.form = formReducer;

// Create and add other application reducers based on action types
const reqGlobalActionTypes = require.context('./action-types', true, /\.js$/i);

reqGlobalActionTypes.keys().forEach((filename) => {
  const reducerName = filename.split('.')[1].substr(1);
  const inititalState = {};

  if (reducerName === 'global') {
    inititalState.language = appConfig.app.default.language;
  }

  childReducers[reducerName] = createReducer(reqGlobalActionTypes(filename), inititalState);
});

// Create and add other page-specific reducers
/* eslint-disable */
const reqRouteActionTypes = require.context('../routes', true, /\/action\-types\/[a-z\-]+\.js$/i);
/* eslint-enable */

reqRouteActionTypes.keys().forEach((filename) => {
  const reducerName = filename.split('.')[1].substr(1).replace('/action-types', '');
  childReducers[reducerName] = createReducer(reqRouteActionTypes(filename));
});

// Combine the child reducers into a root reducer for the app
const appReducer = combineReducers(childReducers);

export default appReducer;
