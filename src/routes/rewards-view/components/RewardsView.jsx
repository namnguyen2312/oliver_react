import React, { PropTypes } from 'react';

import RewardsTabView from './RewardsTabView';
import RewardsModalView from './RewardsModalView';
import RewardsBankModalView from './RewardsBankModalView';

const RewardsView = ({ children }) => (
  <div className="wrapper">
    <RewardsTabView />
    {children}
    <RewardsModalView />
    <RewardsBankModalView />
  </div>
);

RewardsView.propTypes = {
  children: PropTypes.element,
};

export default RewardsView;
