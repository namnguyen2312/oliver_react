import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class CurrentlyOnlineItem extends Component {

  static propTypes = {
    user: PropTypes.shape({
      display_name: PropTypes.string.isRequired,
      logo: PropTypes.string
    }).isRequired,
    defaultSrc: PropTypes.string.isRequired
  }

  static defaultProps = {
    defaultSrc: 'https://placeholdit.imgix.net/~text?w=90&h=90'
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  handleOnClick = (e) => {
    e.preventDefault();
  }

  render() {
    const { user, defaultSrc } = this.props;
    const { display_name: displayName, logo } = user;

    return (
      <li>
        <Link to="/" onClick={this.handleOnClick}>
          <span className="avatar-left">
            <img src={logo || defaultSrc} alt={displayName} />
          </span>
          <span className="name">{displayName}</span>
        </Link>
      </li>
    );
  }
}

export default CurrentlyOnlineItem;
