import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getTwitchUser } from '../../action-creators/dashboard-view';
import appConfig from '../../../../../config/app.json';

class TwitchConnection extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isConnectedTwitch: PropTypes.bool.isRequired,
    availableUserProfile: PropTypes.shape({
      connections: PropTypes.shape({
        twitch: PropTypes.shape({
          connection_type: PropTypes.string
        })
      })
    })
  }

  static defaultProps = {
    isConnectedTwitch: false
  }

  shouldComponentUpdate(nextProps) {
    return this.props.isConnectedTwitch !== nextProps.isConnectedTwitch;
  }

  getLoginStatus = () => {
    const { dispatch } = this.props;
    window.Twitch.getStatus((err, status) => {
      if (this.isClicked && !status.authenticated) {
        this.isClicked = false;
        window.Twitch.login({
          scope: ['user_read', 'channel_read'],
          redirect_uri: 'http://localhost:3000/site/dashboard'
        });
      }
      else if (status.authenticated) {
        dispatch(getTwitchUser(status.token));
      }
    });
  }

  handleClientLogin = () => {
    // e.preventDefault();

    this.isClicked = true;
    this.getLoginStatus();
  }

  twitchAsyncInit = () => {
    window.Twitch.init({
      clientId: appConfig.socials.twitch.clientId
    });
    this.getLoginStatus();
  }

  handleScriptInject = ({ scriptTags }) => {
    if (scriptTags && !this.loadedScript) {
      const scriptTag = scriptTags[0];
      scriptTag.onload = () => {
        this.twitchAsyncInit();
      };
      this.loadedScript = true;
    }
  }

  renderTwitchConnectionType = () => {
    const { availableUserProfile } = this.props;
    const { connections } = availableUserProfile;
    if (connections && connections.twitch && connections.twitch.connection_type) {
      return connections.twitch.connection_type;
    }

    return '';
  }

  render() {
    const { isConnectedTwitch } = this.props;
    const connectionType = this.renderTwitchConnectionType();
    console.log('connectionType', connectionType);
    return (
      <li
        className={`${(connectionType === 'twitch' || isConnectedTwitch) ? 'connected' : ''}`}
      >
        <Helmet
          script={[
            {
              src: '//ttv-api.s3.amazonaws.com/twitch.min.js'
            }
          ]}
          onChangeClientState={(newState, addedTags) => this.handleScriptInject(addedTags)}
        />
        <Link to="/" onClick={this.handleClientLogin}>
          <span className="lbl-point">+100pts</span>
          <img src="/images/connect_twitch.png" alt="Twitch Connection" />
          <span className="conect-status">{(connectionType === 'twitch' || isConnectedTwitch) ? 'Connected' : 'Connect'}
          </span>
        </Link>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  const { isConnectedTwitch } = state['dashboard-view/dashboard-view'].socials || {
    isConnectedTwitch: false
  };
  const availableUserProfile = state['dashboard-view/dashboard-view'].availableUserProfile ||
    {
      data: [],
      loading: true,
      message: '',
      isAuthenticated: false
    };

  return {
    isConnectedTwitch,
    availableUserProfile
  };
};

export default connect(mapStateToProps)(TwitchConnection);
