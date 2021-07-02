import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getListFriends } from '../../action-creators/dashboard-view';
import CurrentlyOnlineList from './CurrentlyOnlineList';

class CurrentlyOnlineView extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    friends: PropTypes.arrayOf(PropTypes.shape({
      user: PropTypes.shape({
        _id: PropTypes.number.isRequired,
        display_name: PropTypes.string.isRequired,
        logo: PropTypes.string
      }).isRequired
    }).isRequired).isRequired
  }

  static defaultProps = {
    friends: []
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getListFriends());
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.friends, nextProps.friends);
  }

  render() {
    const { friends } = this.props;

    return (
      <div className="block-section">
        <div className="block-scroll">
          <h2 className="ttl-title">Currently Online</h2>
          <CurrentlyOnlineList friends={friends} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const friends = state['dashboard-view/dashboard-view'].friends || [];

  return {
    friends
  };
};

export default connect(mapStateToProps)(CurrentlyOnlineView);
