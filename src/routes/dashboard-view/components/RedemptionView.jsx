import React from 'react';

const RedemptionView = () => (
  <div className="head-section">
    <div className="row">
      <div className="col-md-6">
        <div className="box-item clearfix">
          <p className="img-box"><img src="/images/icon/ico_gift.png" alt="" /></p>
          <div className="box-right">
            <p className="ttl-box">redemption this week</p>
            <p className="box-num">20</p>
            <p className="box-count"><span>+20</span>from this week</p>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="box-item clearfix">
          <p className="img-box"><img src="/images/icon/ico_reward02.png" alt="" /></p>
          <div className="box-right">
            <p className="ttl-box">FANS REDEEMING REWARDS THIS WEEK</p>
            <p className="box-num">10</p>
            <p className="box-count"><span>+10</span>from this week</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RedemptionView;
