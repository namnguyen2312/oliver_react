import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateSocialsStatus } from '../../action-creators/dashboard-view';
import appConfig from '../../../../../config/app.json';

class YoutubeConnection extends Component {

  static propTypes = {
    isConnectedYoutube: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);

    this.oauthUrl = this.getOAuthUrl();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.isConnectedYoutube !== nextProps.isConnectedYoutube;
  }

  getOAuthUrl = () => (
    [
      appConfig.socials.youtube.oauthUrl,
      `?client_id=${appConfig.socials.youtube.clientId}`,
      `&redirect_uri=${appConfig.socials.youtube.redirectUri}`,
      `&scope=${appConfig.socials.youtube.scope}`,
      `&response_type=${appConfig.socials.youtube.responseType}`,
      `&approval_prompt=${appConfig.socials.youtube.approvalPrompt}`,
      `&access_type=${appConfig.socials.youtube.accessType}`
    ].join('')
  )

  render() {
    const { isConnectedYoutube } = this.props;
    return (
      <li className={`${isConnectedYoutube ? 'connected' : ''}`}>
        <a href={this.oauthUrl}>
          <span className="lbl-point">+100pts</span>
          <img src="/images/connect_youtube.png" alt="Youtube Connection" />
          <span className="conect-status">{isConnectedYoutube ? 'Connected' : 'Connect'}</span>
        </a>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  const { isConnectedYoutube } = state['dashboard-view/dashboard-view'].socials || {
    isConnectedYoutube: false
  };

  return {
    isConnectedYoutube
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updateSocialsStatus: () => dispatch(updateSocialsStatus('isConnectedYoutube'))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeConnection);
