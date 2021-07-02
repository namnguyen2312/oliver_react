import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getYourGroups } from '../../action-creators/dashboard-view';
import GroupsList from './GroupsList';

class YourGroupsView extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    groups: PropTypes.shape({
      teams: PropTypes.arrayOf(PropTypes.shape({
        display_name: PropTypes.string.isRequired,
        logo: PropTypes.string
      }).isRequired).isRequired
    }).isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getYourGroups());
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.groups, nextProps.groups);
  }

  render() {
    const { groups } = this.props;
    const hasYourGroups = groups.teams.length;

    return (
      <div className={`block-section ${hasYourGroups ? '' : 'hidden'}`}>
        <h2 className="ttl-title">Your Groups</h2>
        <GroupsList groups={groups} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const yourGroups = state['dashboard-view/dashboard-view'].yourGroups || {
    teams: []
  };

  return {
    groups: yourGroups
  };
};

export default connect(mapStateToProps)(YourGroupsView);
