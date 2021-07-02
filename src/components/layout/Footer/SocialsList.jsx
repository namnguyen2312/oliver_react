import React, { PropTypes } from 'react';

import SocialsItem from './SocialsItem';

const SocialsList = ({ socials }) => {
  const socialsList = socials.map(social => <SocialsItem key={social.id} {...social} />);

  return (
    <ul className="social-list">
      {socialsList}
    </ul>
  );
};

SocialsList.propTypes = {
  socials: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
};

export default SocialsList;
