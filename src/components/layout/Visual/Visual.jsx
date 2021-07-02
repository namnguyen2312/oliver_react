import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import FeatureForm from './FeatureForm';
import Streaming from './Streaming';

class Visual extends Component {

  static propTypes = {
    availableUserProfile: PropTypes.shape({
      connections: PropTypes.shape({
        twitch: PropTypes.shape({
          username: PropTypes.string
        })
      }),
      name: PropTypes.string
    })
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.availableUserProfile, nextProps.availableUserProfile);
  }

  renderTwitchUsername = () => {
    const { availableUserProfile } = this.props;
    const { connections } = availableUserProfile;

    if (connections && connections.twitch && connections.twitch.username) {
      return connections.twitch.username;
    }

    return '';
  }

  render() {
    const { availableUserProfile } = this.props;

    return (
      <div id="Visual">
        <img src="/images/cover.png" alt="cover" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 info-top">
              <div className="col-md-5">
                <div className="info clearfix">
                  <p className="img-avatar"><img src="/images/img_avatar_big02.png" alt="" /></p>
                  <div className="info-right">
                    <p className="txt-info">{availableUserProfile.name}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <ul className="follow">
                  <li><span>Follower</span>20,457</li>
                  <li><span>Following</span>1989</li>
                  <li><span>Videos</span>243</li>
                </ul>
              </div>
              <div className="col-md-3">
                <div className="victory">
                  <div className="head-info" data-toggle="modal" data-target=".bs-modal-lg">
                    <span><i className="fa fa-star" aria-hidden="true" />1100 points</span>
                  </div>
                  <div className="head-info" data-toggle="modal" data-target=".bs-modal-lg">
                    <span><i className="fa fa-video-camera" aria-hidden="true" />3 Channel</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 info-bottom">
              <div className="col-md-5">
                <div className="info clearfix">
                  <div className="info-right">
                    <p className="txt-info"><span>Channel</span>
                      <Link
                        target="_blank"
                        href={
                          `https://www.twitch.tv/${this.renderTwitchUsername()}`
                        }
                      >
                        @twitch.tv/{this.renderTwitchUsername()}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="info-right">
                  <Streaming />
                </div>
              </div>
              <div className="col-md-5">
                <FeatureForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const availableUserProfile = state['dashboard-view/dashboard-view'].availableUserProfile ||
    {
      data: [],
      loading: true,
      message: '',
      isAuthenticated: false,
      connections: {}
    };

  return {
    availableUserProfile
  };
};

export default connect(mapStateToProps)(Visual);
