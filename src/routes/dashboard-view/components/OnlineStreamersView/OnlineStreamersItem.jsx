import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class OnlineStreamersItem extends Component {

  static propTypes = {
    selectOnlineStreamer: PropTypes.func.isRequired,
    channel: PropTypes.shape({
      game: PropTypes.string.isRequired,
      display_name: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      logo: PropTypes.string
    }).isRequired,
    defaultSrc: PropTypes.string.isRequired
  }

  static defaultProps = {
    defaultSrc: 'https://placeholdit.imgix.net/~text?w=90&h=90'
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  handleClick = () => {
    this.props.selectOnlineStreamer();
  }

  render() {
    const { channel, defaultSrc } = this.props;
    const { display_name: displayName, game, name, logo } = channel;
    const streamUrl = `https://player.twitch.tv/?channel=${name}&autoplay=true`;

    return (
      <div className="block-item">
        <Link
          to="/"
          data-toggle="modal"
          data-target=".bs-modal-streamer"
          data-backdrop="static"
          data-keyboard="false"
          data-link={streamUrl}
          onClick={this.handleClick}
        >
          <span className="img-item"><img src={logo || defaultSrc} alt={displayName} /></span>
          <span className="item-right">
            <span className="name-streamer">{displayName}</span>
            <span className="name-game">{game}</span>
          </span>
        </Link>
      </div>
    );
  }
}

export default OnlineStreamersItem;
