import React from 'react';
import { Link } from 'react-router';

const LargeModal = () => (
  <div className="modal fade bs-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 className="modal-title" id="gridSystemModalLabel">Your Points<span>You have collected these points for these streamers</span></h4>
        </div>

        <div className="modal-body">
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>Streamer Name</th>
                <th>Current Points</th>
                <th>All time points</th>
                <th>&nbsp;</th>
              </tr>
              <tr>
                <td>
                  <img src="/images/img_avatar_streamer01.png" alt="" />
                  <span className="name">Sneaky</span>
                </td>
                <td>50 Schrute Bucks</td>
                <td>50 Schrute Bucks</td>
                <td>
                  <Link to="/">See more</Link>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/images/img_avatar_streamer02.png" alt="" />
                  <span className="name">C9</span>
                </td>
                <td>60 Honor</td>
                <td>60 Honor</td>
                <td><Link to="/">See more</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default LargeModal;
