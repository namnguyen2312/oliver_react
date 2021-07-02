import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';

import AvailableCompletedRedemptionsItem from './AvailableCompletedRedemptionsItem';

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
    }).isRequired).isRequired
  }

  shouldComponentUpdate(nextProps) {
    const { availableRedemptions } = this.props;
    return !isEqual(availableRedemptions, nextProps.availableRedemptions);
  }

  renderAvailableCompletedRedemtionList = () => {
    const { availableRedemptions } = this.props;

    return availableRedemptions.map(item => (
      <AvailableCompletedRedemptionsItem key={item.id} {...item} />
    ));
  }

  render() {
    return (
      <div>
        {this.renderAvailableCompletedRedemtionList()}
      </div>
    );
  }
}

export default AvailableCompletedRedemptionsList;
