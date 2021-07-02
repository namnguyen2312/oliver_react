import React, { Component } from 'react';

import AvailableCompletedRedemptionView from './AvailableCompletedRedemptionsView';

class RedemptionsCompletedView extends Component {

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div className="table-custom">
        <div className="table-heading">
          <span className="w1">User</span>
          <span className="w2">Type</span>
          <span className="w3">Details</span>
          <span className="w4">Date</span>
          <span className="w5">Action</span>
        </div>
        <AvailableCompletedRedemptionView />
      </div>
    );
  }
}

export default RedemptionsCompletedView;
