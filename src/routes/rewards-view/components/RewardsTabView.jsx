import React from 'react';
import { IndexLink, Link } from 'react-router';

import appConfig from '../../../../config/app.json';

const RewardsTabView = () => (
  <div className="rewards-menu">
    <ul className="nav nav-tabs">
      <li>
        <IndexLink to={`${appConfig.app.ROOT_PATH}/rewards`} activeClassName="active">
          My Rewards
        </IndexLink>
      </li>
      <li>
        <Link to={`${appConfig.app.ROOT_PATH}/rewards/redemptions`} activeClassName="active">
          Redemptions
        </Link>
      </li>
    </ul>
  </div>
);

export default RewardsTabView;
