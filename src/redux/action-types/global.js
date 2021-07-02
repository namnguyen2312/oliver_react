/**
 * App action types
 * @module  redux/action-types/global
 */

import createActionTypes from '../../utils/action-type-factory';

const GLOBAL_STATE_ACTIONS = createActionTypes('GLOBAL', [
  'SET',
  'CHANGE_LOCALE',

  'POST_LAUNCH_BOT_REQUEST',
  'POST_LAUNCH_BOT_SUCCESS',
  'POST_LAUNCH_BOT_FAILURE',

  'POST_KILL_BOT_REQUEST',
  'POST_KILL_BOT_SUCCESS',
  'POST_KILL_BOT_FAILURE'
]);

export default GLOBAL_STATE_ACTIONS;
