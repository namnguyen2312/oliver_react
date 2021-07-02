import React from 'react';
import { Link } from 'react-router';

const RecentVictories = () => (
  <div>
    <p className="ttl-victory">Recent Victories:</p>
    <ul className="victory-list">
      <li><Link to="/">1v1 Bet on Xaryu</Link></li>
      <li><Link to="/">Win RazerNaga Giveaway</Link></li>
      <li><Link to="/">1v1 Bet on Xaryu</Link></li>
    </ul>
  </div>
);

export default RecentVictories;
