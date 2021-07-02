import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ConnectSociallyItem extends Component {

  static propTypes = {
    href: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    connected: PropTypes.bool.isRequired
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { href, points, src, connected } = this.props;

    return (
      <li className={`${connected ? 'connected' : ''}`}>
        <Link to={href}>
          <span className="lbl-point">{points}</span>
          <img src={src} alt="" />
          <span className="conect-status">{connected ? 'Connected' : 'Connect'}</span>
        </Link>
      </li>
    );
  }
}

export default ConnectSociallyItem;
