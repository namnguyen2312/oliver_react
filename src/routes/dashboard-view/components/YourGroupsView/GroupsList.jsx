import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';

import GroupsItem from './GroupsItem';

class GroupsList extends Component {

  static propTypes = {
    groups: PropTypes.shape({
      teams: PropTypes.arrayOf(PropTypes.shape({
        display_name: PropTypes.string.isRequired,
        logo: PropTypes.string
      }).isRequired).isRequired
    }).isRequired
  }

  componentDidMount() {
    this.groupsListElm = window.jQuery('.groups-list');
    this.initCustomScrollbar();
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.groups, nextProps.groups);
  }

  componentDidUpdate() {
    this.groupsListElm.mCustomScrollbar('destroy');
    this.initCustomScrollbar();
  }

  initCustomScrollbar = () => {
    this.groupsListElm.mCustomScrollbar({
      autoHideScrollbar: false,
      theme: 'dark'
    });
  }

  renderGroupsList = () => {
    const { groups } = this.props;
    const { teams } = groups;

    return teams.map((team) => {
      const { _id } = team;
      return (<GroupsItem key={_id} {...team} />);
    });
  }

  render() {
    return (
      <div className="block-list custom-height groups-list">
        {this.renderGroupsList()}
      </div>
    );
  }
}

export default GroupsList;
