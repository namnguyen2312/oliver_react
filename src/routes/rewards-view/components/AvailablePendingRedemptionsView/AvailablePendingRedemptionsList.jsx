import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';

import AvailablePendingRedemptionsItem from './AvailablePendingRedemptionsItem';

class AvailableCompletedRedemptionsList extends Component {

  static propTypes = {
    availableRedemptions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      streamer_id: PropTypes.number.isRequired,
      reward_id: PropTypes.string.isRequired,
      reward_name: PropTypes.string,
      viewer_id: PropTypes.number,
      viewer_name: PropTypes.string,
      viewer_avatar: PropTypes.string,
      is_bot_request: PropTypes.bool.isRequired,
      status: PropTypes.string.isRequired,
      user_input_fields: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string
      })),
      created_at: PropTypes.shape({
        date: PropTypes.string.isRequired
      })
    }).isRequired).isRequired,
    currentPage: PropTypes.number.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.availableRedemptions, nextProps.availableRedemptions);
  }

  renderAvailablePendingRedemtionList = () => {
    const { availableRedemptions } = this.props;

    return availableRedemptions.map(item => (
      <AvailablePendingRedemptionsItem
        key={item.id} {...item}
        currentPage={this.props.currentPage}
      />
    ));
  }

  render() {
    return (
      <div>
        {this.renderAvailablePendingRedemtionList()}
      </div>
    );
  }
}

export default AvailableCompletedRedemptionsList;
