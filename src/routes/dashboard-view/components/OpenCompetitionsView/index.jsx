import React from 'react';
import { Link } from 'react-router';

import appConfig from '../../../../../config/app.json';
import openCompetitions from '../../../../data/open-competitions';
import OpenCompetitionsList from './OpenCompetitionsList';

const OpenCompetitionsView = () => (
  <div className="section">
    <h2 className="ttl-title">Open Competitions from your Subscriptions</h2>
    <div className="section-inner">
      <OpenCompetitionsList openCompetitions={openCompetitions} />
      <p className="view-more"><Link to={`${appConfig.app.ROOT_PATH}/competitions`}>View more</Link></p>
    </div>
  </div>
);

export default OpenCompetitionsView;
