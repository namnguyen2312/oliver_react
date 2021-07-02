/**
 * App action creators
 * @module  redux/action-creators/global
 */
import { cloneDeep } from 'lodash';

import GLOBAL_STATE_ACTIONS from '../action-types/global';
import { post } from '../../utils/api';

export const setGlobalState = globalState => ({
  type: GLOBAL_STATE_ACTIONS.SET,
  data: globalState
});

export const changeLocale = languageLocale => ({
  type: GLOBAL_STATE_ACTIONS.CHANGE_LOCALE,
  data: {
    language: languageLocale
  }
});

export const launchBot = (body = {}) => (dispatch, getState) => {
  const bot = cloneDeep(getState().global).bot || {
    isLaunched: false, loading: true, message: ''
  };

  dispatch({
    type: GLOBAL_STATE_ACTIONS.POST_LAUNCH_BOT_REQUEST,
    data: {
      bot
    },
  });

  post('/bot/launch', body).then((json) => {
    if (json.status === 'success') {
      dispatch({
        type: GLOBAL_STATE_ACTIONS.POST_LAUNCH_BOT_SUCCESS,
        data: {
          bot: { ...bot, isLaunched: true, loading: false, message: '' }
        }
      });
    }
    else {
      dispatch({
        type: GLOBAL_STATE_ACTIONS.POST_LAUNCH_BOT_FAILURE,
        data: {
          bot: { ...bot, isLaunched: false, loading: false, message: json.message }
        }
      });
    }
  });
};

export const killBot = (body = {}) => (dispatch, getState) => {
  const bot = cloneDeep(getState().global).bot || {
    isLaunched: true, loading: true, message: ''
  };

  dispatch({
    type: GLOBAL_STATE_ACTIONS.POST_KILL_BOT_REQUEST,
    data: {
      bot
    }
  });

  post('/bot/kill', body).then((json) => {
    if (json.status === 'success') {
      dispatch({
        type: GLOBAL_STATE_ACTIONS.POST_KILL_BOT_SUCCESS,
        data: {
          bot: { ...bot, isLaunched: false, loading: false, message: '' }
        }
      });
    }
    else {
      dispatch({
        type: GLOBAL_STATE_ACTIONS.POST_KILL_BOT_FAILURE,
        data: {
          bot: { ...bot, isLaunched: true, loading: false, message: '' }
        }
      });
    }
  });
};

export const logout = () => () => {
  // const csrfParam = document.head.querySelector('[name="csrf-param"]').content;
  // const csrfToken = document.head.querySelector('[name="csrf-token"]').content;

  // const form = new FormData();
  // form.append(`${csrfParam}`, csrfToken);

  // const params = {
  //   method: 'POST',
  //   body: form
  // };

  // fetch('http://oliver.greentech-vn.com/site/logout', params)
  //   .then(res => res.json())
  //   .then((data) => {
  //     console.log('data', data);
  //   });
  window.jQuery('#logout-form').submit();
  // window.location = 'http://oliver.greentech-vn.com/';
};
