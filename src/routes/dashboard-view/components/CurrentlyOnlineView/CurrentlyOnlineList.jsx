import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';

import CurrentlyOnlineItem from './CurrentlyOnlineItem';

class CurrentlyOnlineList extends Component {

  static propTypes = {
    friends: PropTypes.arrayOf(PropTypes.shape({
      user: PropTypes.shape({
        _id: PropTypes.number.isRequired,
        display_name: PropTypes.string.isRequired,
        logo: PropTypes.string
      }).isRequired
    }).isRequired).isRequired
  }

  componentDidMount() {
    window.jQuery('.online-list').mCustomScrollbar({
      autoHideScrollbar: false,
      theme: 'dark'
    });
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.friends, nextProps.friends);
  }

  renderCurrentlyOnlineList = () => {
    const { friends } = this.props;

    return friends.map((friend) => {
      const { user } = friend;
      const { _id: id } = user;
      return (<CurrentlyOnlineItem key={id} {...friend} />);
    });
  }

  render() {
    return (
      <ul className="online-list">
        {this.renderCurrentlyOnlineList()}
      </ul>
    );
  }
}

export default CurrentlyOnlineList;
