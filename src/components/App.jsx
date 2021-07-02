import React, { PropTypes } from 'react';

import BackToTop from './layout/BackToTop';
import Footer from './layout/Footer';
import Header from './layout/Header';
import LargeModal from './layout/LargeModal';
import Ribbon from './layout/Ribbon';
import StreamerModal from './layout/StreamerModal';
import Nav from './layout/Nav';
import Visual from './layout/Visual';

import '../assets/scss/components/app.scss';

const App = ({ children }) => (
  <div>
    <Ribbon />
    <Nav />
    <div id="Wrap">
      <Header />
      <main role="main" id="Main">
        <article id="Content">
          <Visual />
          <div className="container-fluid">
            { React.cloneElement(children, { key: 'secret-key' }) }
          </div>
        </article>
        <BackToTop />
      </main>
      <Footer />
    </div>
    <LargeModal />
    <StreamerModal />
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
