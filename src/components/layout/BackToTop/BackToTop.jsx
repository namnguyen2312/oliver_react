import React, { Component } from 'react';

class BackToTop extends Component {

  componentWillMount() {
    window.jQuery(window).scroll(() => {
      const scroll = window.jQuery(window).scrollTop();
      if (scroll >= 300) {
        window.jQuery('#Pagetop').show();
      }
      else {
        window.jQuery('#Pagetop').hide();
      }
    });
  }

  handleClick = () => {
    window.jQuery('html, body').animate({
      scrollTop: 0
    }, 600);
    return false;
  }

  render() {
    return (
      <p id="Pagetop"><button onClick={() => this.handleClick()}><i className="fa fa-angle-up" aria-hidden="true" /></button></p>
    );
  }
}
export default BackToTop;
