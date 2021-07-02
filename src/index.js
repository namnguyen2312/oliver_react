/**
 * App
 * @module  core/index
 */

import { createHistory } from 'history'; // eslint-disable-line
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';

import store from './redux/store';
import routes from './routes';

const browserHistory = useRouterHistory(createHistory)({
  basename: ''
});

/* eslint-disable */
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  ,
  document.getElementById('app')
);
