import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';

class RewardsBankItem extends Component {

  static propTypes = {
    addRewardsBankItem: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    point: PropTypes.number.isRequired,
    image: PropTypes.string,
    is_add: PropTypes.bool.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  // changeStatus = () => {
  //   if
  // }

  render() {
    const { name, point, image, is_add: isAdd } = this.props;
    const src = image || '/images/redem1.png';
    console.log('is_add', this.props.is_add);
    return (
      <div className="reward-item clearfix">
        <p className="img-item">
          <img src={src} alt={name} />
        </p>
        <div className="reward-bank-info">
          <p>{name} <span>{point} pts</span></p>
          <button onClick={this.props.addRewardsBankItem}>{isAdd === true ? 'Added' : '+ Add'}</button>
        </div>
      </div>
    );
  }
}

export default RewardsBankItem;
