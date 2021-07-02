import React from 'react';

import ConnectSociallyView from './ConnectSociallyView';
import CurrentlyOnlineView from './CurrentlyOnlineView';
import LatestCompetitionsView from './LatestCompetitionsView';
import OnlineStreamersView from './OnlineStreamersView';
import PendingRedemption from './PendingRedemption';
import RecentlyEarnedRewardsView from './RecentlyEarnedRewardsView';
import RedemptionView from './RedemptionView';
import YourGroupsView from './YourGroupsView';

const DashboardView = () => (
  <div className="row">
    <div className="col-md-9">
      <RedemptionView />
      <LatestCompetitionsView />
      <ConnectSociallyView />
    </div>
    <div className="col-md-3">
      <PendingRedemption />
      <CurrentlyOnlineView />
      <RecentlyEarnedRewardsView />
      <YourGroupsView />
      <OnlineStreamersView />
    </div>
  </div>
);

export default DashboardView;
