import React, { Component } from 'react';

class RewardsBankModalView extends Component {

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div className="modal fade bs-modal-rebank" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="gridSystemModalLabel">Rewards Bank</h4>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#automated">automated</a></li>
                    <li><a data-toggle="tab" href="#personalized">personalized</a></li>
                  </ul>
                  <div className="tab-content">
                    <div id="automated" className="tab-pane fade in active rewardbank-popup">
                      <p>
                        Automated rewards provide interaction opportunities to your community
                         with minial effort from you.
                         These prices are based on 40 hours of streaming per week.
                      </p>
                      <div className="reward-item clearfix">
                        <p className="img-item"><img src="/images/viewer_avatar.png" alt="twitch" /></p>
                        <div className="reward-bank-info col-md-8">
                          <h4>Emote only chat (!emoteonly)</h4>
                          <p>Turn on emotes only chat for 2 minute</p>
                          <span>500 pts</span>
                        </div>
                        <button><i className="fa fa-check" aria-hidden="true" />Added</button>
                      </div>
                      <div className="reward-item clearfix">
                        <p className="img-item"><img src="/images/viewer_avatar.png" alt="twitch" /></p>
                        <div className="reward-bank-info col-md-8">
                          <h4>Emote only chat (!emoteonly)</h4>
                          <p>Turn on emotes only chat for 2 minute</p>
                          <span>500 pts</span>
                        </div>
                        <button><i className="fa fa-check" aria-hidden="true" />Added</button>
                      </div>
                      <div className="reward-item clearfix">
                        <p className="img-item"><img src="/images/viewer_avatar.png" alt="twitch" /></p>
                        <div className="reward-bank-info col-md-8">
                          <h4>Emote only chat (!emoteonly)</h4>
                          <p>Turn on emotes only chat for 2 minute</p>
                          <span>500 pts</span>
                        </div>
                        <button><i className="fa fa-check" aria-hidden="true" />Added</button>
                      </div>
                      <div className="reward-item clearfix">
                        <p className="img-item"><img src="/images/viewer_avatar.png" alt="twitch" /></p>
                        <div className="reward-bank-info col-md-8">
                          <h4>Emote only chat (!emoteonly)</h4>
                          <p>Turn on emotes only chat for 2 minute</p>
                          <span>500 pts</span>
                        </div>
                        <button><i className="fa fa-check" aria-hidden="true" />Added</button>
                      </div>
                    </div>
                    <div id="personalized" className="tab-pane fade">
                      <h3>Menu 1</h3>
                      <p>Some content in menu 1.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RewardsBankModalView;
