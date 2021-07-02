import { isEqual, find } from 'lodash';
import React, { Component, PropTypes } from 'react';

import cooldownList from 'data/cool-down';

class AvailableRewardsItem extends Component {

  static propTypes = {
    selectReward: PropTypes.func.isRequired,
    updateRewardStatus: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    bot_command: PropTypes.string,
    cooldown: PropTypes.string.isRequired,
    image: PropTypes.string,
    is_enable: PropTypes.bool,
    point: PropTypes.number.isRequired,
    defaultSrc: PropTypes.string.isRequired
  }

  static defaultProps = {
    defaultSrc: 'https://placeholdit.imgix.net/~text?w=128&h=128'
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  render() {
    const {
      name,
      description,
      bot_command: botCommand,
      cooldown,
      image,
      is_enable: isEnable,
      point,
      defaultSrc,
      selectReward,
      updateRewardStatus
    } = this.props;

    return (
      <div className="col-md-6">
        <div className="block-reward">
          <div className="row">
            <div className="col-md-12 desc-size">
              <p className="img-item"><img src={image || defaultSrc} alt={name} /></p>
              <div className="item-right">
                <div className="item-head">
                  <h3>{name} <span>{botCommand ? `(${botCommand})` : ''}</span></h3>
                  <p>{point}</p>
                </div>
                <div className="item-des">
                  <p>{description}</p>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <p className="cooldown">
                <i className="fa fa-clock-o" aria-hidden="true" />
                <span>Cooldown: {find(cooldownList, { key: cooldown }).val}</span>
              </p>
              <div className="btn-item">
                <button onClick={updateRewardStatus}>
                  <i className="fa fa-minus-circle" aria-hidden="true" />
                  {isEnable ? 'Disable' : 'Enable'}
                </button>
                <button data-toggle="modal" data-target=".bs-modal-reward" onClick={selectReward}>
                  <i className="fa fa-pencil" aria-hidden="true" />Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AvailableRewardsItem;
