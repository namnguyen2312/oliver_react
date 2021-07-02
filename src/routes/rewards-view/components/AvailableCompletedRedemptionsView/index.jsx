import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';

import AvailableCompletedRedemptionsList from './AvailableCompletedRedemptionsList';
import { getAvailableRedemptions } from '../../action-creators/rewards-view';

class AvailableCompletedRedemptionsView extends Component {

  static propTypes = {
    getAvailableRedemptions: PropTypes.func.isRequired,
    availableRedemptions: PropTypes.shape({
      meta: PropTypes.shape({
        total_count: PropTypes.number,
        page_count: PropTypes.number,
        current_page: PropTypes.number,
        per_page: PropTypes.number
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
    status: 'ACCEPT',
    current: 1
  }

  componentDidMount() {
    this.props.getAvailableRedemptions(this.props.status, this.props.current);
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.availableRedemptions,
      nextProps.availableRedemptions);
  }
  onChange = (page) => {
    this.props.getAvailableRedemptions(this.props.status, page);
  }

  render() {
    const { availableRedemptions } = this.props;
    const { data: listRedemption } = availableRedemptions;
    let content;
    if (availableRedemptions.meta.total_count === 0) {
      content = (
        <div className="pedding-image">
          <img src="/images/pending-image.png" alt="pending iamge" />
        </div>
      );
    }
    else {
      content = (
        <AvailableCompletedRedemptionsList availableRedemptions={listRedemption} />
      );
    }

    return (
      <div className="table-content">
        {content}
        <Pagination
          onChange={this.onChange}
          current={availableRedemptions.meta.current_page}
          total={availableRedemptions.meta.total_count}
          showLessItems
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const availableRedemptions = state['rewards-view/rewards-view'].availableRedemptions || {
    data: [],
    loading: true,
    message: '',
    meta: { total_count: 0, page_count: 0, current_page: 0, per_page: 0 }
  };

  return {
    availableRedemptions
  };
};

const mapDispatchToProps = dispatch => ({
  getAvailableRedemptions: (status, page) => dispatch(getAvailableRedemptions(status, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailableCompletedRedemptionsView);
