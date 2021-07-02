import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { acceptRefundAndApproval } from '../../action-creators/rewards-view';

class AvailablePendingRedemptionsItem extends Component {

  static propTypes = {
    acceptRefundAndApproval: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
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
    currentPage: PropTypes.number.isRequired,
    defaultSrc: PropTypes.string.isRequired
  }

  static defaultProps = {
    defaultSrc: 'https://placeholdit.imgix.net/~text?w=128&h=128'
  }

  constructor(props) {
    super(props);

    this.state = {
      showBox: false
    };
  }

  componentWillReceiveProps(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  convertDate = (format) => {
    const { date } = this.props.created_at;
    return moment(date).format(format);
  }

  handleClick = (status) => {
    const body = {
      redeem_id: this.props.id,
      status,
      currentPage: this.props.currentPage,
      statusPage: 'PENDING'
    };
    this.setState({ showBox: false });
    this.props.acceptRefundAndApproval(body);
  }

  openAction = () => {
    this.setState({ showBox: !this.state.showBox });
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

    const openBox = (
      <ul>
        <li><button onClick={() => this.handleClick('ACCEPT')}>Approve</button></li>
        <li><button onClick={() => this.handleClick('REFUND')}>Refund</button></li>
      </ul>
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
          <span className="w5 color"><button onClick={() => this.openAction()}>...</button>
            {this.state.showBox ? openBox : null}
          </span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  acceptRefundAndApproval: (body = {}) => dispatch(acceptRefundAndApproval(body)),
});

export default connect(null, mapDispatchToProps)(AvailablePendingRedemptionsItem);
