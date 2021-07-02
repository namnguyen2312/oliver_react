import React from 'react';

import connections from '../../../data/connections';
import ConnectionsListView from './ConnectionsListView';

const ConnectionsView = () => (
  <div className="row">
    <div className="col-md-12">
      <div className="section">
        <h2 className="ttl-title">Your connections</h2>
        <ConnectionsListView connections={connections} />
      </div>
    </div>
  </div>
);

export default ConnectionsView;
