import React, { Component, PropTypes } from 'react';

import ConnectionsItemView from './ConnectionsItemView';

class ConnectionsListView extends Component {

  static propTypes = {
    connections: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      socialName: PropTypes.string.isRequired,
      connected: PropTypes.bool.isRequired
    })).isRequired
  }

  shouldComponentUpdate() {
    return true;
  }

  renderConnectionsItem = () => {
    const { connections } = this.props;

    return connections.map((connection, index) =>
      <ConnectionsItemView key={index} connection={connection} />
    );
  }

  render() {
    return (
      <div className="section-inner">
        <div className="competitions conecttions">
          <div className="row row-list">
            {this.renderConnectionsItem()}
          </div>
        </div>
      </div>
    );
  }
}

export default ConnectionsListView;
