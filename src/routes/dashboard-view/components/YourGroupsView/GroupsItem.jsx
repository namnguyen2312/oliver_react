import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import appConfig from '../../../../../config/app.json';

class GroupsItem extends Component {

  static propTypes = {
    display_name: PropTypes.string.isRequired,
    logo: PropTypes.string,
    defaultSrc: PropTypes.string.isRequired
  }

  static defaultProps = {
    defaultSrc: 'https://placeholdit.imgix.net/~text?w=90&h=90'
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  render() {
    const { logo, display_name: displayName, defaultSrc } = this.props;

    return (
      <div className="block-item">
        <Link to={appConfig.app.ROOT_PATH}>
          <span className="img-item"><img src={logo || defaultSrc} alt={displayName} /></span>
          <span className="item-right">
            <span className="m-title">{displayName}</span>
            <span className="txt-bold">{displayName}</span>
          </span>
        </Link>
      </div>
    );
  }
}

export default GroupsItem;
