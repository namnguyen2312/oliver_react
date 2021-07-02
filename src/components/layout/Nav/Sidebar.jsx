import React from 'react';
import { Link } from 'react-router';

import appConfig from '../../../../config/app.json';
import navs from '../../../data/sidebar-navs-list';
import NavsList from './NavsList';

const Sidebar = () => (
  <nav id="Side">
    <p id="Logo">
      <Link to={appConfig.app.ROOT_PATH}>
        <img src="/images/common/logo.png" alt="Oliver" />
      </Link>
    </p>
    <NavsList navs={navs} />
  </nav>
);

export default Sidebar;
