import React from 'react';
import { Link } from 'react-router';

import appConfig from '../../../../../config/app.json';
import competitions from '../../../../data/latest-competitions';
import LatestCompetitionsList from './LatestCompetitionsList';

const LatestCompetitionsView = () => (
  <div className="section">
    <h2 className="ttl-title">Latest Competitions</h2>
    <div className="section-inner">
      <LatestCompetitionsList competitions={competitions} />
      <p className="view-more"><Link to={`${appConfig.app.ROOT_PATH}/competitions`}>View more</Link></p>
    </div>
  </div>
);

export default LatestCompetitionsView;
