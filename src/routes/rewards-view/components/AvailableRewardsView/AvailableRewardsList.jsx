import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';

import AvailableRewardsItem from './AvailableRewardsItem';

class AvailableRewardsList extends Component {

  static propTypes = {
    selectReward: PropTypes.func.isRequired,
    updateRewardStatus: PropTypes.func.isRequired,
    availableRewards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      bot_command: PropTypes.string,
      cooldown: PropTypes.string.isRequired,
      image: PropTypes.string,
      is_enable: PropTypes.bool,
      point: PropTypes.number.isRequired
    }).isRequired).isRequired
  }

  static defaultProps = {
    availableRewards: []
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.availableRewards, nextProps.availableRewards);
  }

  renderAvailableRewardsList = () => {
    const { availableRewards, selectReward, updateRewardStatus } = this.props;

    return availableRewards.map(item => (
      <AvailableRewardsItem
        key={item.id}
        {...item}
        selectReward={() => { selectReward(item); }}
        updateRewardStatus={() => { updateRewardStatus(item); }}
      />
    ));
  }

  render() {
    return (
      <div className="reward">
        <div className="row">
          {this.renderAvailableRewardsList()}
        </div>
      </div>
    );
  }
}

export default AvailableRewardsList;
