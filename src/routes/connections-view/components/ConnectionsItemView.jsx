import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ConnectionsItemView extends Component {

  static propTypes = {
    connection: PropTypes.shape({
      src: PropTypes.string.isRequired,
      socialName: PropTypes.string.isRequired,
      connected: PropTypes.bool.isRequired
    }).isRequired
  }

  shouldComponentUpdate() {
    return true;
  }

  renderSocialIsConnected = connection => (
    <div className="col-md-4 row-item">
      <div className="block-competition">
        <div className="conect">
          <p className="conimg-left">
            <img className="" src={connection.src} alt="" />
          </p>
          <p className="conp">Connected</p>
          <p className="conimg"><i className="fa fa-check-circle fa-4" aria-hidden="true" /></p>
        </div>
      </div>
    </div>
  )

  renderSocialIsNotConnected = connection => (
    <div className="col-md-4 row-item">
      <div className="block-competition">{/* .conect-success */}
        <div className="conect conect-chanel">
          <p className="conimg-left">
            <img alt="" src={connection.src} />
          </p>
          <p className="conp">Connect</p>
          <p className="conimg">
            <img alt="" src="/images/icon/ico_plus.png" />
          </p>
        </div>

        <div className="conected">
          <p className="dialog_title">
            <span>{connection.socialName}</span><em>You have connected</em>
            <Link to="/" className="cona">this account</Link>
          </p>

          <div className="row">
            <div className="col-md-4">
              <p className="dialog_sm">Follower Bonus <br /> <span>Optional</span></p>
            </div>
            <div className="col-md-8">
              <p className="dialog_lg">
                <input type="number" min="0" step="100" name="search" placeholder="0" />
              </p>
              <p className="dialog_text">
                <span>
                  Amount of point viewer earn for every 7 days
                   that they followed your Facebook account
                </span>
              </p>
              <p className="dialog_btn"><button className="btn btn-orange">Save</button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  render() {
    const { connection } = this.props;

    if (connection.connected) {
      return this.renderSocialIsConnected(connection);
    }

    return this.renderSocialIsNotConnected(connection);
  }
}

export default ConnectionsItemView;
