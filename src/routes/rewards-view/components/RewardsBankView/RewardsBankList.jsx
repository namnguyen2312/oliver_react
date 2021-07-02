import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';

import RewardsBankItem from './RewardsBankItem';

class RewardsBankList extends Component {

  static propTypes = {
    addRewardsBankItem: PropTypes.func.isRequired,
    rewardsBank: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      point: PropTypes.number.isRequired
    }).isRequired).isRequired,
  }

  static defaultProps = {
    rewardsBank: []
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  renderRewardsBankList = () => {
    const { rewardsBank } = this.props;

    return rewardsBank.map(reward =>
      <RewardsBankItem
        key={reward.id} {...reward}
        addRewardsBankItem={() => { this.props.addRewardsBankItem(reward); }}
      />
    );
  }

  render() {
    return (
      <div className="reward-bank">
        {this.renderRewardsBankList()}
        <button
          className="btn-all hide"
          data-toggle="modal"
          data-target=".bs-modal-rebank"
          data-backdrop="static"
          data-keyboard="false"
        >See All</button>
      </div>
    );
  }
}

export default RewardsBankList;
