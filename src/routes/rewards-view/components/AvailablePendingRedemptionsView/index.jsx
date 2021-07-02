import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';

import AvailablePendingRedemptionsList from './AvailablePendingRedemptionsList';
import { getAvailableRedemptions } from '../../action-creators/rewards-view';

class AvailablePendingRedemptionsView extends Component {

  static propTypes = {
    getAvailableRedemptions: PropTypes.func.isRequired,
    availableRedemptions: PropTypes.shape({
      meta: PropTypes.shape({
        total_count: PropTypes.number.isRequired,
        page_count: PropTypes.number.isRequired,
        current_page: PropTypes.number.isRequired,
        per_page: PropTypes.number.isRequired
      }),
      data: PropTypes.arrayOf(PropTypes.shape({
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
    }).isRequired,
    status: PropTypes.string.isRequired,
    current: PropTypes.number.isRequired
  }

  static defaultProps = {
    status: 'PENDING',
    current: 1
  }

  componentDidMount() {
    this.props.getAvailableRedemptions(this.props.status, this.props.current);
  }

  shouldComponentUpdate(nextProps) {
    const { availableRedemptions } = this.props;
    return !isEqual(availableRedemptions, nextProps.availableRedemptions);
  }

  onChange = (page) => {
    this.props.getAvailableRedemptions(this.props.status, page);
  }

  render() {
    const { availableRedemptions } = this.props;
    const { data: listRedemption, meta } = availableRedemptions;
    let content;

    if (meta.total_count === 0) {
      content = (
        <div className="pedding-image">
          <img src="/images/pending-image.png" alt="pending iamge" />
        </div>
      );
    }
    else {
      content = (
        <AvailablePendingRedemptionsList
          availableRedemptions={listRedemption}
          currentPage={meta.current_page}
        />
      );
    }

    return (
      <div className="table-content">
        {content}
        <Pagination
          onChange={this.onChange}
          current={meta.current_page}
          total={meta.total_count}
          showLessItems
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { availableRedemptions } = state['rewards-view/rewards-view'];

  const data = availableRedemptions || {
    data: [],
    loading: true,
    message: '',
    meta: { total_count: 0, page_count: 0, current_page: 0, per_page: 0 }
  };

  return {
    availableRedemptions: data
  };
};

const mapDispatchToProps = dispatch => ({
  getAvailableRedemptions: (status, page) => dispatch(getAvailableRedemptions(status, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailablePendingRedemptionsView);
