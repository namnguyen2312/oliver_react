/**
 * App routes
 * @module  core/routes
 */

import React from 'react';
import { IndexRoute, Route } from 'react-router';

import appConfig from '../config/app.json';

import App from './components/App';
import NotFoundPage from './components/layout/NotFoundPage';
import ConnectionsView from './routes/connections-view/components/ConnectionsView';
import RequireAuthentication from './routes/dashboard-view/components/AuthenticationView/RequireAuthentication';
import DashboardView from './routes/dashboard-view/components/DashboardView';
import RedemptionsCompletedView from './routes/rewards-view/components/RedemptionsCompletedView';
import RedemptionsContentView from './routes/rewards-view/components/RedemptionsContentView';
import RedemptionsPendingView from './routes/rewards-view/components/RedemptionsPendingView';
import RewardsContentView from './routes/rewards-view/components/RewardsContentView';
import RewardsView from './routes/rewards-view/components/RewardsView';

/**
 * Please keep routes in alphabetical order
 */
const routes = (
  <Route path={`${appConfig.app.ROOT_PATH}`} component={RequireAuthentication(App)}>
    <IndexRoute component={DashboardView} />
    <Route path="connections" component={ConnectionsView} />
    <Route path="rewards" component={RewardsView}>
      <IndexRoute component={RewardsContentView} />
      <Route path="redemptions" component={RedemptionsContentView}>
        <IndexRoute component={RedemptionsPendingView} />
        <Route path="completed" component={RedemptionsCompletedView} />
      </Route>
    </Route>

    {/* Catch all route */}
    <Route path="*" component={NotFoundPage} status={404} />
  </Route>
);

export default routes;
