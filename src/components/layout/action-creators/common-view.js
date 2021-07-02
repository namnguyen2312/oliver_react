/**
 * Rewards view action creators
 */
import { post } from 'utils/api';

import COMMON_TYPES from '../action-types/common-view';

export const launchBot = (body = {}) => (dispatch) => {
  post('/bot/launch', body).then((json) => {
    if (!json.message) {
      dispatch({
        type: COMMON_TYPES.POST_LAUNCH_BOT_SUCCESS,
        data: {
          botData: { data: [], status: true, message: '' }
        }
      });
    }
    else {
      dispatch({
        type: COMMON_TYPES.POST_LAUNCH_BOT_FAILURE,
        data: {
          botData: { data: [], status: false, message: json.message }
        }
      });
    }
  });
};

export const killBot = (body = {}) => (dispatch) => {
  post('/bot/kill', body).then((json) => {
    if (!json.message) {
      dispatch({
        type: COMMON_TYPES.POST_KILL_BOT_SUCCESS,
        data: {
          killBot: { data: [], status: true, message: '' }
        }
      });
    }
    else {
      dispatch({
        type: COMMON_TYPES.POST_KILL_BOT_FAILURE,
        data: {
          killBot: { data: [], status: false, message: json.message }
        }
      });
    }
  });
};

export const logout = () => () => {
  const csrfParam = document.head.querySelector('[name="csrf-param"]').content;
  const csrfToken = document.head.querySelector('[name="csrf-token"]').content;

  const form = new FormData();
  form.append(`${csrfParam}`, csrfToken);

  const params = {
    method: 'POST',
    body: form
  };

  fetch('http://oliver.greentech-vn.com/site/logout', params)
    .then(res => res.json())
    .then((data) => {
      console.log('data', data);
    });
  // window.location = 'http://oliver.greentech-vn.com/';
};

export default {};
