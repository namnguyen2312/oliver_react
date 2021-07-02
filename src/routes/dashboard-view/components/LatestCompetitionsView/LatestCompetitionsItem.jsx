import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class LatestCompetitionsItem extends Component {

  static propTypes = {
    href: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    competitionName: PropTypes.string.isRequired,
    competitionType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    userBar: PropTypes.string.isRequired,
    rangeBar: PropTypes.number.isRequired
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {
      href,
      src,
      competitionName,
      competitionType,
      title,
      desc,
      userBar,
      rangeBar
    } = this.props;

    return (
      <div className="col-md-6">
        <div className="block-competition">
          <Link to={href}>
            <div className="img-competition">
              <p><img src={src} alt="" /></p>
              <p className="competition-name">{competitionName}<span>{competitionType}</span></p>
            </div>
            <div className="txt-info">
              <p className="txt-title">{title}</p>
              <p className="txt-des">{desc}</p>
            </div>
            <div className="user-bar">
              <p className="txt-user-bar">{userBar}</p>
              <p className="range-bar"><span className="count-range">{rangeBar}</span></p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default LatestCompetitionsItem;
