/**
 * Dashboard view action creators
 */
import { cloneDeep } from 'lodash';
import appConfig from '../../../../config/app.json';
import DASHBOARD_TYPES from '../action-types/dashboard-view';
import { get, post } from '../../../utils/api';

const DASHBOARD_VIEW = 'dashboard-view/dashboard-view';

function getTwitchHeaders() {
  return {
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': appConfig.socials.twitch.clientId
    }
  };
}

export const getOnlineStreamers = () => (dispatch) => {
  fetch(`${appConfig.socials.twitch.url}/streams/`, getTwitchHeaders())
    .then(res => res.json())
    .then((data) => {
      if (data.error) {
        dispatch({
          type: DASHBOARD_TYPES.GET_ONLINE_STREAMERS_FAILURE,
          data: {
            onlineStreamers: { _total: 0, streams: [] }
          }
        });
      }
      else {
        dispatch({
          type: DASHBOARD_TYPES.GET_ONLINE_STREAMERS_SUCCESS,
          data: {
            onlineStreamers: data
          }
        });
      }
    });
};

export const getYourGroups = () => (dispatch) => {
  const userId = 31239503;
  fetch(`${appConfig.socials.twitch.url}/channels/${userId}/teams`, getTwitchHeaders())
    .then(res => res.json())
    .then((data) => {
      if (data.error) {
        dispatch({
          type: DASHBOARD_TYPES.GET_YOUR_GROUPS_FAILURE,
          data: {
            yourGroups: { teams: [] }
          }
        });
      }
      else {
        dispatch({
          type: DASHBOARD_TYPES.GET_YOUR_GROUPS_SUCCESS,
          data: {
            yourGroups: data
          }
        });
      }
    });
};

export const getListFriends = () => (dispatch) => {
  const username = 'oliverbotdemo';
  const authorizationToken = 'bjjf3q2hc4nkjggcrxema1yke2jyfr';
  const requestHeaders = {
    method: 'GET',
    headers: {
      'Client-ID': appConfig.socials.twitch.clientId,
      Authorization: `OAuth ${authorizationToken}`
    }
  };
  const url = `${appConfig.socials.twitch.url}/users/${username}/friends`;

  fetch(url, requestHeaders)
    .then(res => res.json())
    .then((data) => {
      const { friends } = data;

      dispatch({
        type: DASHBOARD_TYPES.GET_ONLINE_FRIENDS_SUCCESS,
        data: {
          friends
        }
      });
    });
};

export const getUserProfile = () => (dispatch) => {
  get('/users/me').then((json) => {
    if (!json.message) {
      dispatch({
        type: DASHBOARD_TYPES.GET_USER_PROFILE_SUCCESS,
        data: {
          availableUserProfile: {
            ...json,
            loading: false,
            message: json.message,
            isAuthenticated: true
          }
        }
      });
    }
    else {
      dispatch({
        type: DASHBOARD_TYPES.GET_USER_PROFILE_FAILURE,
        data: {
          availableUserProfile: {
            data: [],
            loading: false,
            message: json.message,
            isAuthenticated: false
          }
        }
      });
    }
  });
};

export const updateSocialsStatus = socialKey => (dispatch, getState) => {
  const socials = cloneDeep(getState()[DASHBOARD_VIEW]).socials || {
    isConnectedFacebook: false,
    isConnectedYoutube: false,
    isConnectedTwitch: false,
  };

  socials[socialKey] = true;

  dispatch({
    type: DASHBOARD_TYPES.UPDATE_SOCIALS_STATUS,
    data: {
      socials
    }
  });
};

const setUserConnections = (id, username, email, bio, token) => (dispatch) => {
  const body = {
    connection_type: 'twitch',
    id,
    username,
    email,
    bio,
    token
  };

  post('/users/connections', body).then((json) => {
    if (json.username) {
      dispatch(updateSocialsStatus('isConnectedTwitch'));
    }
  });
};

export const getTwitchUser = token => (dispatch) => {
  const params = getTwitchHeaders();
  params.headers.Authorization = `OAuth ${token}`;

  dispatch({
    type: DASHBOARD_TYPES.GET_TWITCH_USER,
    data: {}
  });

  fetch('https://api.twitch.tv/kraken/user', params)
    .then(res => res.json())
    .then((data) => {
      console.log('twitch', data);
      dispatch(setUserConnections(data.id, data.name, data.email, data.bio, token));
    });
};

export const selectOnlineStreamer = streamer => ({
  type: DASHBOARD_TYPES.SELECT_ONLINE_STREAMER,
  data: {
    selectedOnlineStreamer: streamer,
  }
});

export default {};
