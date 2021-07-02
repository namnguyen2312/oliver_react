import React from 'react';

import socials from '../../../data/footer-socials-list';
import SocialsList from './SocialsList';

const Footer = () => (
  <footer id="Footer">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <p id="Copryright">ProjectOliver &copy; {new Date().getFullYear()} - Terms of Service - Privacy policy </p>
        </div>
        <div className="col-md-6">
          <SocialsList socials={socials} />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
