import React, { PropTypes } from 'react';

import NavsItem from './NavsItem';

const NavsList = ({ navs }) => {
  const navsList = navs.map(nav => <NavsItem key={nav.id} {...nav} />);

  return (
    <div className="side-nav">
      <ul className="nav-list">
        {navsList}
      </ul>
    </div>
  );
};

NavsList.propTypes = {
  navs: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    navName: PropTypes.string.isRequired
  })).isRequired
};

export default NavsList;
