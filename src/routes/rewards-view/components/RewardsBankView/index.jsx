import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RewardsBankList from './RewardsBankList';
import { getRewardsBank, addRewardsBankItem } from '../../action-creators/rewards-view';

class RewardsBankView extends Component {

  static propTypes = {
    getRewardsBank: PropTypes.func.isRequired,
    addRewardsBankItem: PropTypes.func.isRequired,
    rewardsBank: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        point: PropTypes.number.isRequired
      }).isRequired),
    }).isRequired,
  }

  componentDidMount() {
    this.props.getRewardsBank();
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.rewardsBank, nextProps.rewardsBank);
  }

  render() {
    const { rewardsBank } = this.props;
    const { data: listRewardsBank } = rewardsBank;

    return (
      <div className="block-section-redeem block-section-redeem-1">
        <div className="ttl-block">
          <h2 className="ttl-title">Rewards Bank</h2>
          <p>Add these rewards for your viewers to redeem</p>
        </div>
        <RewardsBankList
          rewardsBank={listRewardsBank}
          addRewardsBankItem={this.props.addRewardsBankItem}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const rewardsBank = state['rewards-view/rewards-view'].rewardsBank || {
    data: [],
    loading: false,
    message: '',
  };

  return {
    rewardsBank
  };
};

const mapDispatchToProps = dispatch => ({
  getRewardsBank: () => dispatch(getRewardsBank()),
  addRewardsBankItem: item => dispatch(addRewardsBankItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RewardsBankView);
