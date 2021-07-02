import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getOnlineStreamers, selectOnlineStreamer } from '../../action-creators/dashboard-view';
import OnlineStreamersList from './OnlineStreamersList';

class OnlineStreamersView extends Component {

  static propTypes = {
    getOnlineStreamers: PropTypes.func.isRequired,
    selectOnlineStreamer: PropTypes.func.isRequired,
    onlineStreamers: PropTypes.shape({
      _total: PropTypes.number.isRequired,
      streams: PropTypes.arrayOf(PropTypes.shape({
        channel: PropTypes.shape({
          game: PropTypes.string.isRequired,
          display_name: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          logo: PropTypes.string
        }).isRequired
      }).isRequired).isRequired
    }).isRequired
  }

  componentDidMount() {
    this.props.getOnlineStreamers();
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.onlineStreamers, nextProps.onlineStreamers);
  }

  render() {
    const { onlineStreamers } = this.props;
    const hasOnlineStreamer = onlineStreamers.streams.length;

    return (
      <div className={`block-section ${hasOnlineStreamer ? '' : 'hidden'}`}>
        <h2 className="ttl-title">Online Streamers</h2>
        <OnlineStreamersList
          onlineStreamers={onlineStreamers}
          selectOnlineStreamer={this.props.selectOnlineStreamer}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const onlineStreamers = state['dashboard-view/dashboard-view'].onlineStreamers || {
    _total: 0,
    streams: []
  };

  return { onlineStreamers };
};

const mapDispatchToProps = dispatch => ({
  getOnlineStreamers: () => dispatch(getOnlineStreamers()),
  selectOnlineStreamer: streamer => dispatch(selectOnlineStreamer(streamer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnlineStreamersView);
