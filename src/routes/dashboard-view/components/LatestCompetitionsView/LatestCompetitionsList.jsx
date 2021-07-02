import React, { Component, PropTypes } from 'react';

import LatestCompetitionsItem from './LatestCompetitionsItem';

class LatestCompetitionsList extends Component {

  static propTypes = {
    competitions: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      competitionName: PropTypes.string.isRequired,
      competitionType: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      userBar: PropTypes.string.isRequired,
      rangeBar: PropTypes.number.isRequired
    })).isRequired
  }

  shouldComponentUpdate() {
    return true;
  }

  renderLatestCompetitionsList = () => {
    const { competitions } = this.props;

    return competitions.map(competition =>
      <LatestCompetitionsItem key={competition.id} {...competition} />
    );
  }

  render() {
    return (
      <div className="competitions">
        <div className="row">
          {this.renderLatestCompetitionsList()}
        </div>
      </div>
    );
  }
}

export default LatestCompetitionsList;
