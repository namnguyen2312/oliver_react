import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const SocialsItem = ({ href, src, name }) => (
  <li>
    <Link to={href} target="_blank">
      <img src={src} alt={name} />
    </Link>
  </li>
);

SocialsItem.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default SocialsItem;
