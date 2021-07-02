import React from 'react';

const RedemptionWeekView = () => (
  <div className="block-section-redeem">
    <div className="ttl-block">
      <h2 className="ttl-title">Redemption this week</h2>
    </div>

    <div className="redeem-point clearfix">
      <p className="img-item"><img src="/images/redem.png" alt="twitch" /></p>
      <div className="des">
        <p className="point">20</p>
        <p className="remind"><span>+20</span>from this week</p>
      </div>
    </div>
  </div>
);

export default RedemptionWeekView;
