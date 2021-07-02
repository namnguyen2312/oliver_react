/**
 * Rewards view action creators
 */

import { cloneDeep, indexOf, find } from 'lodash';
import { reset } from 'redux-form';
import { get, post, put, del } from 'utils/api';
import REWARDS_TYPES from '../action-types/rewards-view';

const REWARDS_VIEW = 'rewards-view/rewards-view';

export const getAvailableRewards = () => (dispatch) => {
  dispatch({
    type: REWARDS_TYPES.GET_AVAILABLE_REWARDS,
    data: {
      availableRewards: { data: [], loading: true, message: '' }
    }
  });

  get('/rewards').then((json) => {
    if (!(json.status === 'error')) {
      dispatch({
        type: REWARDS_TYPES.GET_AVAILABLE_REWARDS_SUCCESS,
        data: {
          availableRewards: { ...json, loading: false, message: '' }
        }
      });
    }
    else {
      dispatch({
        type: REWARDS_TYPES.GET_AVAILABLE_REWARDS_FAILURE,
        data: {
          availableRewards: { data: [], loading: false, message: json.message }
        }
      });
    }
  });
};

export const getAvailableRedemptions = (status, page) => (dispatch, getState) => {
  const initAvailableRedemptions = cloneDeep(getState()[REWARDS_VIEW]).availableRedemptions || {
    data: [],
    loading: true,
    message: '',
    meta: { total_count: 0, page_count: 0, current_page: 0, per_page: 0 }
  };

  dispatch({
    type: REWARDS_TYPES.GET_AVAILABLE_REDEMPTIONS,
    data: {
      availableRedemptions: {
        ...initAvailableRedemptions,
        loading: true,
        message: ''
      }
    }
  });

  get(`/redeems?status=${status}&page=${page}`).then((json) => {
    if (!json.message) {
      dispatch({
        type: REWARDS_TYPES.GET_AVAILABLE_REDEMPTIONS_SUCCESS,
        data: {
          availableRedemptions: {
            ...json,
            loading: false,
            message: ''
          }
        }
      });
    }
    else {
      dispatch({
        type: REWARDS_TYPES.GET_AVAILABLE_REDEMPTIONS_FAILURE,
        data: {
          availableRedemptions: {
            ...initAvailableRedemptions,
            loading: false,
            message: json.message
          }
        }
      });
    }
  });
};

export const createReward = (body = {}) => (dispatch) => {
  dispatch({
    type: REWARDS_TYPES.CREATE_REWARD,
    data: {
      rewardForm: { data: [], loading: true, message: '' }
    }
  });

  post('/rewards', body).then((json) => {
    if (!json.message) {
      dispatch({
        type: REWARDS_TYPES.CREATE_REWARD_SUCCESS,
        data: {
          rewardForm: { data: [], loading: false, message: '' }
        }
      });
      dispatch(getAvailableRewards());
      dispatch(reset('reward-form'));
    }
    else {
      dispatch({
        type: REWARDS_TYPES.CREATE_REWARD_FAILURE,
        data: {
          rewardForm: { data: [], loading: false, message: json.message }
        }
      });
    }
  });
};

export const acceptRefundAndApproval = (body = {}) => (dispatch) => {
  dispatch({
    type: REWARDS_TYPES.ACCEPT_REFUND_AND_APPROVAL,
    data: {
      availablePendingRedemption: { data: [], loading: true, message: '' }
    }
  });

  put(`/redeems/${body.redeem_id}`, body).then((json) => {
    if (!json.message) {
      dispatch({
        type: REWARDS_TYPES.ACCEPT_REFUND_AND_APPROVAL_SUCCESS,
        data: {
          availablePendingRedemption: { data: [], loading: false, message: '' }
        }
      });
      dispatch(getAvailableRedemptions(body.statusPage, body.currentPage));
    }
    else {
      dispatch({
        type: REWARDS_TYPES.ACCEPT_REFUND_AND_APPROVAL_FAILURE,
        data: {
          availablePendingRedemption: { data: [], loading: false, message: json.message }
        }
      });
    }
  });
};

export const editReward = (body = {}) => (dispatch) => {
  dispatch({
    type: REWARDS_TYPES.EDIT_REWARD,
    data: {
      rewardForm: { data: [], loading: true, message: '' }
    }
  });

  put(`/rewards/${body.id}`, body).then((json) => {
    if (!json.message) {
      dispatch({
        type: REWARDS_TYPES.EDIT_REWARD_SUCCESS,
        data: {
          rewardForm: { data: [], loading: false, message: '' }
        }
      });
      dispatch(getAvailableRewards());
    }
    else {
      dispatch({
        type: REWARDS_TYPES.EDIT_REWARD_FAILURE,
        data: {
          rewardForm: { data: [], loading: false, message: json.message }
        }
      });
    }
  });
};

export const submitReward = values => (dispatch) => {
  if (values.id) {
    dispatch(editReward(values));
  }
  else {
    dispatch(createReward(values));
  }
};

export const selectReward = (reward = {}) => ({
  type: REWARDS_TYPES.SELECT_REWARD,
  data: {
    selectedReward: reward
  }
});

export const getRewardsBank = () => (dispatch) => {
  dispatch({
    type: REWARDS_TYPES.GET_REWARDS_BANK,
    data: {
      rewardsBank: { data: [], loading: true, message: '' }
    }
  });

  get('/bank/rewards').then((json) => {
    if (!(json.status === 'error')) {
      dispatch({
        type: REWARDS_TYPES.GET_REWARDS_BANK_SUCCESS,
        data: {
          rewardsBank: { ...json, loading: false, message: '' }
        }
      });
    }
    else {
      dispatch({
        type: REWARDS_TYPES.GET_REWARDS_BANK_FAILURE,
        data: {
          rewardsBank: { data: [], loading: false, message: json.message }
        }
      });
    }
  });
};

export const updateRewardStatus = (reward = {}) => (dispatch, getState) => {
  dispatch({
    type: REWARDS_TYPES.UPDATE_REWARD_STATUS_REQUEST,
    data: {
      updateRewardStatus: { loading: true, message: '', }
    },
  });

  const body = {
    is_enable: !reward.is_enable
  };

  put(`/rewards/${reward.id}/status`, body).then((json) => {
    if (json.status === 'success') {
      dispatch({
        type: REWARDS_TYPES.UPDATE_REWARD_STATUS_SUCCESS,
        data: {
          updateRewardStatus: { loading: false, message: '', }
        },
      });

      const { availableRewards } = cloneDeep(getState()[REWARDS_VIEW]);
      const index = indexOf(availableRewards.data, find(availableRewards.data, { id: reward.id }));
      availableRewards.data.splice(index, 1, { ...reward, is_enable: body.is_enable });

      dispatch({
        type: REWARDS_TYPES.GET_AVAILABLE_REWARDS_SUCCESS,
        data: {
          availableRewards
        }
      });
    }
    else {
      dispatch({
        type: REWARDS_TYPES.UPDATE_REWARD_STATUS_FAILURE,
        data: {
          updateRewardStatus: { loading: false, message: json.message, }
        }
      });
    }
  });
};

export const deleteReward = (reward = {}) => (dispatch) => {
  dispatch({
    type: REWARDS_TYPES.DELETE_REWARD_REQUEST,
    data: {
      deleteReward: { loading: true, message: '' }
    }
  });

  del(`/rewards/${reward.id}`).then((json) => {
    if (json.status === 'success') {
      dispatch({
        type: REWARDS_TYPES.DELETE_REWARD_SUCCESS,
        data: {
          deleteReward: { loading: false, message: '' }
        }
      });
      dispatch(getAvailableRewards());
    }
    else {
      dispatch({
        type: REWARDS_TYPES.DELETE_REWARD_FAILURE,
        data: {
          deleteReward: { loading: false, message: json.message }
        }
      });
    }
  });
};

export const addRewardsBankItem = (rewardsBankItem = {}) => (dispatch) => {
  dispatch({
    type: REWARDS_TYPES.ADD_REWARDS_BANK_ITEM_REQUEST,
    data: {
      createRewardTemplate: { data: {}, loading: true, message: '' }
    },
  });

  post('/rewards/templates', { template_id: rewardsBankItem.id }).then((json) => {
    if (json.status !== 'error') {
      dispatch({
        type: REWARDS_TYPES.ADD_REWARDS_BANK_ITEM_SUCCESS,
        data: {
          createRewardTemplate: { data: json, loading: false, message: '' }
        }
      });
      dispatch(getAvailableRewards());
    }
    else {
      dispatch({
        type: REWARDS_TYPES.ADD_REWARDS_BANK_ITEM_SUCCESS,
        data: {
          createRewardTemplate: { data: {}, loading: false, message: json.message }
        }
      });
    }
  });
};

export default {};
