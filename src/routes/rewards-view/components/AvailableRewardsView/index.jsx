import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AvailableRewardsList from './AvailableRewardsList';
import {
  getAvailableRewards,
  selectReward,
  updateRewardStatus,
} from '../../action-creators/rewards-view';

class AvailableRewardsView extends Component {

  static propTypes = {
    getAvailableRewards: PropTypes.func.isRequired,
    selectReward: PropTypes.func.isRequired,
    updateRewardStatus: PropTypes.func.isRequired,
    availableRewards: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      message: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        bot_command: PropTypes.string,
        cooldown: PropTypes.string.isRequired,
        image: PropTypes.string,
        is_enable: PropTypes.bool,
        point: PropTypes.number.isRequired
      }).isRequired)
    }).isRequired
  }

  componentDidMount() {
    this.props.getAvailableRewards();
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.availableRewards, nextProps.availableRewards);
  }

  componentDidUpdate() {
    if (!this.props.availableRewards.loading) {
      window.jQuery('.close').click();
    }
  }

  render() {
    const { availableRewards } = this.props;
    const { data: listRewards } = availableRewards;

    return (
      <div className="section-inner">
        <AvailableRewardsList
          availableRewards={listRewards}
          selectReward={this.props.selectReward}
          updateRewardStatus={this.props.updateRewardStatus}
        />
        <p className="view-more hide">
          <a href="/">View more</a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const availableRewards = state['rewards-view/rewards-view'].availableRewards || {
    data: [],
    loading: false,
    message: ''
  };

  return {
    availableRewards
  };
};

const mapDispatchToProps = dispatch => ({
  getAvailableRewards: () => dispatch(getAvailableRewards()),
  selectReward: reward => dispatch(selectReward(reward)),
  updateRewardStatus: reward => dispatch(updateRewardStatus(reward)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailableRewardsView);
