import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const NavsItem = ({ href, icon, navName }) => (
  <li>
    <Link to={href} onlyActiveOnIndex activeClassName="active">
      <span className={icon} /><span>{navName}</span>
    </Link>
  </li>
);

NavsItem.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  navName: PropTypes.string.isRequired
};

export default NavsItem;
