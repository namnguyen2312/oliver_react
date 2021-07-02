import React from 'react';

import YoutubeConnection from './YoutubeConnection';
import TwitchConnection from './TwitchConnection';
import FacebookConnection from './FacebookConnection';

const ConnectSociallyView = () => (
  <div className="section" id="Social-conect">
    <h2 className="ttl-title">Connect Socially (Earn rewards by connecting socially)</h2>
    <div className="section-inner">
      <ul className="social-conect-list">
        <FacebookConnection />
        <YoutubeConnection />
        <TwitchConnection />
      </ul>
    </div>
  </div>
);

export default ConnectSociallyView;
