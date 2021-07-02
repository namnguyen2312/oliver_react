import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class StreamerModal extends Component {

  static propTypes = {
    selectedOnlineStreamer: PropTypes.shape({}).isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  renderIframe = () => {
    const { selectedOnlineStreamer } = this.props;
    const { channel } = selectedOnlineStreamer;

    if (!(channel && channel.name)) {
      return (<div />);
    }

    return (
      <iframe
        id="Stream-video"
        src={`https://player.twitch.tv/?channel=${channel.name}&autoplay=true`}
        frameBorder="0"
        allowFullScreen="true"
        scrolling="no"
        height="378px"
        width="620px"
      />
    );
  }

  render() {
    const { selectedOnlineStreamer } = this.props;
    const { channel, game } = selectedOnlineStreamer;

    const modalContentStyle = {
      position: 'relative',
      backgroundColor: '#fff',
      WebkitBackgroundClip: 'padding-box',
      backgroundClip: 'padding-box',
      border: '1px solid rgba(0,0,0,.2)',
      borderRadius: '6px',
      outline: 0,
      WebkitBoxShadow: '0 3px 9px rgba(0,0,0,.5)',
      boxShadow: '0 3px 9px rgba(0,0,0,.5)',
    };

    return (
      <div className="modal fade bs-modal-streamer">
        <div className="modal-dialog modal-lg">
          <div style={modalContentStyle}>
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="gridSystemModalLabel">
                {channel && channel.name}<span>{game}</span>
              </h4>
            </div>

            <div className="modal-body">
              <div className="h_iframe" style={{ height: '500px' }}>
                {this.renderIframe()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const selectedOnlineStreamer = state['dashboard-view/dashboard-view'].selectedOnlineStreamer || {
  };

  return {
    selectedOnlineStreamer,
  };
};

export default connect(mapStateToProps)(StreamerModal);
