import React from 'react';

import rewards from '../../../../data/recently-earned-rewards';
import RewardsList from './RewardsList';

const RecentlyEarnedRewardsView = () => (
  <div className="block-section">
    <h2 className="ttl-title">Recently Earned Rewards</h2>
    <RewardsList rewards={rewards} />
  </div>
);

export default RecentlyEarnedRewardsView;
