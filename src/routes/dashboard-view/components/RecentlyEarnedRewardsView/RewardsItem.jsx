import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import appConfig from '../../../../../config/app.json';

class RewardsItem extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
    earnedDate: PropTypes.string.isRequired
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { src, title, points, earnedDate } = this.props;

    return (
      <div className="block-item">
        <Link to={`${appConfig.app.ROOT_PATH}`}>
          <span className="img-item"><img src={src} alt="" /></span>
          <span className="item-right">
            <span className="m-title">{title}</span>
            <span className="txt-item">{points}</span>
            <span className="txt-item">Claimed on {earnedDate}</span>
          </span>
        </Link>
      </div>
    );
  }
}

export default RewardsItem;
