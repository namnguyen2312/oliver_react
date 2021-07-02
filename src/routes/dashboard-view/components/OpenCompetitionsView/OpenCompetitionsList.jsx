import React, { Component, PropTypes } from 'react';

import OpenCompetitionsItem from './OpenCompetitionsItem';

class OpenCompetitionsList extends Component {

  static propTypes = {
    openCompetitions: PropTypes.arrayOf(PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      competitionName: PropTypes.string.isRequired,
      hours: PropTypes.string.isRequired,
      competitionDesc: PropTypes.string.isRequired,
      points: PropTypes.string.isRequired,
      competitionLink: PropTypes.string.isRequired
    })).isRequired
  }

  shouldComponentUpdate() {
    return true;
  }

  renderOpenCompetitionsList = () => {
    const { openCompetitions } = this.props;

    return openCompetitions.map(openCompetition =>
      <OpenCompetitionsItem key={openCompetition.id} {...openCompetition} />
    );
  }

  render() {
    return (
      <div className="section-inner">
        <div className="item-list">
          {this.renderOpenCompetitionsList()}
        </div>
      </div>
    );
  }
}

export default OpenCompetitionsList;
