import React, { Component, PropTypes } from 'react';

import RewardsItem from './RewardsItem';

class RewardsList extends Component {

  static propTypes = {
    rewards: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      points: PropTypes.string.isRequired,
      earnedDate: PropTypes.string.isRequired
    })).isRequired
  }

  componentDidMount() {
    window.jQuery('.rewards-list').mCustomScrollbar({
      autoHideScrollbar: false,
      theme: 'dark'
    });
  }

  shouldComponentUpdate() {
    return true;
  }

  renderRewardsList = () => {
    const { rewards } = this.props;

    return rewards.map(reward => <RewardsItem key={reward.id} {...reward} />);
  }

  render() {
    return (
      <div className="block-list custom-height rewards-list">
        {this.renderRewardsList()}
      </div>
    );
  }
}

export default RewardsList;
