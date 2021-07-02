import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class AvailableCompletedRedemptionsItem extends Component {

  static propTypes = {
    reward_name: PropTypes.string,
    viewer_name: PropTypes.string,
    viewer_avatar: PropTypes.string,
    user_input_fields: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string
    })),
    created_at: PropTypes.shape({
      date: PropTypes.string.isRequired
    }),
    defaultSrc: PropTypes.string.isRequired
  }

  static defaultProps = {
    defaultSrc: 'https://placeholdit.imgix.net/~text?w=128&h=128'
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  convertDate = (format) => {
    const { date } = this.props.created_at;
    return moment(date).format(format);
  }

  render() {
    const {
      reward_name: rewardName,
      viewer_name: viewerName,
      viewer_avatar: viewAvatar,
      user_input_fields: userInputFields
    } = this.props;

    const listItem = userInputFields && userInputFields.map(item =>
      <span key={item.key}>{item.value}</span>
    );

    return (
      <div>
        <div className="table-row">
          <span className="w1">
            <span className="avartar">
              <img src={viewAvatar !== null ? viewAvatar : this.props.defaultSrc} alt="abc " />
            </span>
            {viewerName}
          </span>
          <strong className="w2">{rewardName}</strong>
          <span className="w3">{listItem}</span>
          <span className="w4">{this.convertDate('MMM D, YYYY h:mm a')}</span>
        </div>
      </div>
    );
  }
}

export default AvailableCompletedRedemptionsItem;
