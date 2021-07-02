import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RewardForm from 'components/RewardForm';

class RewardsModalView extends Component {

  static propTypes = {
    selectedReward: PropTypes.shape({}).isRequired,
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { selectedReward } = this.props;

    return (
      <div className="modal fade bs-modal-reward" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" data-backdrop="static" data-keyboard="false"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="gridSystemModalLabel">
                {Object.keys(selectedReward).length ? 'Edit Reward' : 'Create Reward'}
              </h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <RewardForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const selectedReward = state['rewards-view/rewards-view'].selectedReward || {};

  return {
    selectedReward
  };
}

export default connect(mapStateToProps)(RewardsModalView);
