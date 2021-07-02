import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import { launchBot, killBot, logout } from '../../../redux/action-creators/global';
import appConfig from '../../../../config/app.json';

class Header extends Component {

  static propTypes = {
    launchBot: PropTypes.func.isRequired,
    killBot: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    bot: PropTypes.shape({
      isLaunched: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.bool.isRequired,
      ]).isRequired,
    }).isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.bot, nextProps.bot);
  }

  handleLaunchBot = (e) => {
    e.preventDefault();

    if (this.props.bot.isLaunched) {
      this.props.killBot({});
    }
    else {
      this.props.launchBot({});
    }

    window.localStorage.setItem('isLaunchedBot', Number(!this.props.bot.isLaunched));
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { bot } = this.props;

    return (
      <header id="Header">
        <div className="head-search">
          <form action="#" method="post">
            <p className="search-bar">
              <i className="fa fa-search" aria-hidden="true" />
              <input type="text" name="search" placeholder="What are you looking for..." />
            </p>
          </form>
        </div>

        <div className="head-block">
          <div className="head-warning">
            <Link to={appConfig.app.ROOT_PATH}>
              <i className="fa fa-bell" aria-hidden="true" /><span className="num">20</span>
            </Link>
          </div>
          <div className="bot-button">
            <button
              className={bot.isLaunched ? 'brown' : null}
              onClick={this.handleLaunchBot}
            >
              {bot.isLaunched ? 'Kill Oliverbot' : 'Launch Oliverbot'}
            </button>
          </div>
          <div className="user-nav">
            <div className="btn-group">
              <p
                className="head-avatar"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="circle-img"><img src="/images/img_avatar_big02.png" alt="" /></span>
                <span className="username">Faker</span>
                <span className="ico-down">
                  <i className="fa fa-angle-down" aria-hidden="true" />
                </span>
              </p>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/">
                    <i className="fa fa-user" aria-hidden="true" />
                    <span>My profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="fa fa-cog" aria-hidden="true" />
                    <span>User Setting</span>
                  </Link>
                </li>
                <li>
                  <a href="/" onClick={this.handleLogout}>
                    <i className="fa fa-sign-out" aria-hidden="true" />
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const bot = state.global.bot || {
    isLaunched: Number(window.localStorage.getItem('isLaunchedBot')),
    loading: false,
    message: ''
  };

  return {
    bot
  };
};

const mapDispatchToProps = dispatch => ({
  launchBot: (body = {}) => dispatch(launchBot(body)),
  killBot: (body = {}) => dispatch(killBot(body)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
