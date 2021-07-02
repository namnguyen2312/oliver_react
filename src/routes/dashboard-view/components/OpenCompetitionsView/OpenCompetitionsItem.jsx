import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import appConfig from '../../../../../config/app.json';

class OpenCompetitionsItem extends Component {

  static propTypes = {
    avatar: PropTypes.string.isRequired,
    competitionName: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
    competitionDesc: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
    competitionLink: PropTypes.string.isRequired
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {
      avatar,
      competitionName,
      hours,
      competitionDesc,
      points,
      competitionLink
    } = this.props;

    return (
      <div className="item clearfix">
        <p className="img-item">
          <img src={avatar} alt="" />
        </p>
        <div className="item-right">
          <div className="item-head">
            <h3 className="ttl-item">{competitionName}</h3>
            <p className="item-hr">
              <i className="fa fa-clock-o" aria-hidden="true" />
              <span>{hours}</span>
            </p>
          </div>

          <div className="txt-des">
            <p>{competitionDesc}</p>
          </div>

          <div className="range-bot">
            <div className="range-left">
              <p className="point">{points}</p>
              <div className="share">
                <p className="lbl-left">Share:</p>
                <ul className="social-list">
                  <li><Link to={`${appConfig.app.ROOT_PATH}`}> <i className="fa fa-facebook" aria-hidden="true" /></Link></li>
                  <li><Link to={`${appConfig.app.ROOT_PATH}`}> <i className="fa fa-twitter" aria-hidden="true" /></Link></li>
                  <li><Link to={`${appConfig.app.ROOT_PATH}`}> <i className="fa fa-instagram" aria-hidden="true" /></Link></li>
                </ul>
              </div>
            </div>
            <p className="btn-signup"><Link to={competitionLink} className="btn btn-orange">Sign up!</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default OpenCompetitionsItem;
