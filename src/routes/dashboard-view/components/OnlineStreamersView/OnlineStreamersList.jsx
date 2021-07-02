import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';

import OnlineStreamersItem from './OnlineStreamersItem';

class OnlineStreamersList extends Component {

  static propTypes = {
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
    this.onlineStreamersElm = window.jQuery('.online-streamers');
    this.initCustomScrollbar();
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.onlineStreamers, nextProps.onlineStreamers);
  }

  componentDidUpdate() {
    this.onlineStreamersElm.mCustomScrollbar('destroy');
    this.initCustomScrollbar();
  }

  initCustomScrollbar = () => {
    this.onlineStreamersElm.mCustomScrollbar({
      autoHideScrollbar: false,
      theme: 'dark'
    });
  }

  renderOnlineStreamers = () => {
    const { onlineStreamers } = this.props;
    const { streams } = onlineStreamers;

    return streams.map((stream) => {
      const { _id } = stream;
      return (
        <OnlineStreamersItem
          key={_id}
          {...stream}
          selectOnlineStreamer={() => { this.props.selectOnlineStreamer(stream); }}
        />
      );
    });
  }

  render() {
    return (
      <div className="block-list custom-height online-streamers">
        {this.renderOnlineStreamers()}
      </div>
    );
  }
}

export default OnlineStreamersList;
