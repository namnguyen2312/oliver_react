import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FansRedemptionWeekView from './FansRedemptionWeekView';
import RedemptionWeekView from './RedemptionWeekView';
import RewardsBankView from './RewardsBankView';
import AvailableRewardsView from './AvailableRewardsView';
import { selectReward } from '../action-creators/rewards-view';

class RewardsContentView extends Component {

  static propTypes = {
    selectReward: PropTypes.func.isRequired,
  }

  shouldComponentUpdate() {
    return true;
  }

  handleClick = () => {
    this.props.selectReward({});
  }

  render() {
    return (
      <div className="rewards-content">
        <div className="row">
          <div className="col-md-9">
            <div className="tab-content">
              <div className="section tab-pane active" role="tabpanel" id="rewards">
                <div className="row">
                  <div className="col-md-10 header-info">
                    <h2 className="ttl-title">Rewards</h2>
                    <p>These rewards are available for your viewers to redeem</p>
                  </div>
                  <div className="col-md-2 header-button">
                    <button
                      data-toggle="modal"
                      data-target=".bs-modal-reward"
                      data-backdrop="static"
                      data-keyboard="false"
                      onClick={this.handleClick}
                    >
                      Create Rewards
                    </button>
                  </div>
                </div>
                <AvailableRewardsView />
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <RedemptionWeekView />
            <FansRedemptionWeekView />
            <RewardsBankView />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  selectReward: reward => dispatch(selectReward(reward)),
});

export default connect(null, mapDispatchToProps)(RewardsContentView);
