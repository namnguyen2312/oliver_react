import React from 'react';
// import { Link } from 'react-router';

const handleClick = () => {
  window.jQuery('html, body').animate({
    scrollTop: window.jQuery('#Social-conect').offset().top
  }, 2000);
};

const Ribbon = () => (
  <div className="ribbon-wrapper-green">
    <div className="ribbon-green">
      <button className="ribbon-click" onClick={handleClick}>
        <img width="20px" src="/images/icon/ico_dolar.png" alt="dolar" />
        <span>+100</span>
      </button>
    </div>
  </div>
);

export default Ribbon;
