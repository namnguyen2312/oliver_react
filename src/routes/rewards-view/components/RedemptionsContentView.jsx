import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

import appConfig from '../../../../config/app.json';

class RedemptionContentView extends Component {

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div className="rewards-content">
        <div className="rewards-redemptions-content">
          <div className="redemptions-heading">
            <ul className="redemptions-status">
              <li>
                <IndexLink to={`${appConfig.app.ROOT_PATH}/rewards/redemptions`} activeClassName="active">
                  Pending
                </IndexLink>
              </li>
              <li>
                <Link to={`${appConfig.app.ROOT_PATH}/rewards/redemptions/completed`} activeClassName="active">
                  Completed
                </Link>
              </li>
            </ul>
            <div className="custom-select">
              <select disabled name="">
                <option value="">All Rewards</option>
                <option value="">ABC 1</option>
                <option value="">ABC 2</option>
                <option value="">ABC 3</option>
              </select>
            </div>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

RedemptionContentView.propTypes = {
  children: PropTypes.element,
};

export default RedemptionContentView;
