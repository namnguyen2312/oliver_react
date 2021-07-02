import React, { Component, PropTypes } from 'react';

import ConnectSociallyItem from './ConnectSociallyItem';

class ConnectSociallyList extends Component {

  static propTypes = {
    connectSocials: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string.isRequired,
      points: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      connected: PropTypes.bool.isRequired
    }))
  }

  shouldComponentUpdate() {
    return true;
  }

  renderConnectSociallyList = () => {
    const { connectSocials } = this.props;

    return connectSocials.map(connectSocial =>
      <ConnectSociallyItem key={connectSocial.id} {...connectSocial} />
    );
  }

  render() {
    return (
      <div className="section-inner">
        <ul className="social-conect-list">
          {this.renderConnectSociallyList()}
        </ul>
      </div>
    );
  }
}

export default ConnectSociallyList;
