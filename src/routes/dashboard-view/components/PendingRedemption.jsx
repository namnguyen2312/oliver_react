import React from 'react';
import { Link } from 'react-router';

import appConfig from '../../../../config/app.json';

const PendingRedemption = () => (
  <div className="block-section">
    <div className="ttl-block">
      <h2 className="ttl-title">Pending redemption<span>Your most recent redemption</span></h2>
    </div>

    <div className="congrat">
      <p className="ttl-congrat">CONGRATULATION!</p>
      <p className="txt-congrat">Your’re all caught up on your redemptions!</p>
      <p className="ico-congrat"><img src="/images/icon/ico_smile.png" alt="" /></p>
      <p className="view-more"><Link to={`${appConfig.app.ROOT_PATH}`}>View more</Link></p>
    </div>
  </div>
);

export default PendingRedemption;
