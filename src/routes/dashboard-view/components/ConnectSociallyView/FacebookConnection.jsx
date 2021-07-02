import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { updateSocialsStatus } from '../../action-creators/dashboard-view';
import appConfig from '../../../../../config/app.json';

class FacebookConnection extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isConnectedFacebook: PropTypes.bool.isRequired
  }

  static defaultProps = {
    isConnectedFacebook: false
  }

  shouldComponentUpdate(nextProps) {
    return this.props.isConnectedFacebook !== nextProps.isConnectedFacebook;
  }

  getLoginStatus = () => {
    window.FB.getLoginStatus((response) => {
      const { status } = response;

      if (status === 'connected') {
        this.getFacebookUser(response.authResponse.accessToken);
      }
      else if (['not_authorized', 'unknown'].includes(status) && this.isClicked) {
        this.isClicked = false;
        window.FB.login();
      }
    });
  }

  getFacebookUser = (accessToken) => {
    const userId = '10206637539656245';
    const path = `v2.8/${userId}/taggable_friends?`;
    const method = 'get';
    const params = {
      access_token: `${accessToken}`
    };

    window.FB.api(path, method, params, () => ({}));
  }

  handleClientLogin = (e) => {
    e.preventDefault();

    this.isClicked = true;
    this.getLoginStatus();
  }

  subscribeStatusChange = () => {
    const { dispatch } = this.props;

    window.FB.Event.subscribe('auth.statusChange', (e) => {
      if (e.status === 'connected') {
        dispatch(updateSocialsStatus('isConnectedFacebook'));
        this.getFacebookUser(e.authResponse.accessToken);
      }
    });
  }

  fbAsyncInit = () => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: appConfig.socials.facebook.clientId,
        xfbml: appConfig.socials.facebook.xfbml,
        cookie: appConfig.socials.facebook.cookie,
        version: appConfig.socials.facebook.version,
      });
      this.subscribeStatusChange();
      this.getLoginStatus();
    };
  }

  handleScriptInject = ({ scriptTags }) => {
    if (scriptTags && !this.loadedScript) {
      const scriptTag = scriptTags[0];
      scriptTag.onload = () => {
        this.fbAsyncInit();
      };
      this.loadedScript = true;
    }
  }

  render() {
    const { isConnectedFacebook } = this.props;
    return (
      <li className={`${isConnectedFacebook ? 'connected' : ''}`}>
        <Helmet
          script={[
            {
              src: '//connect.facebook.net/en_US/sdk.js',
              id: 'facebook-jssdk'
            }
          ]}
          onChangeClientState={(newState, addedTags) => this.handleScriptInject(addedTags)}
        />
        <Link to="/" onClick={this.handleClientLogin}>
          <span className="lbl-point">+100pts</span>
          <img src="/images/icon/ico_fb_conect.png" alt="Facebook Connection" />
          <span className="conect-status">{isConnectedFacebook ? 'Connected' : 'Connect'}</span>
        </Link>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  const { isConnectedFacebook } = state['dashboard-view/dashboard-view'].socials || {
    isConnectedFacebook: false
  };

  return {
    isConnectedFacebook
  };
};

export default connect(mapStateToProps)(FacebookConnection);
