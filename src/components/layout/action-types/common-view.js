/**
 * Connection view actions
 */
import createActionTypes from '../../../utils/action-type-factory';

const CONNECTION_TYPES = createActionTypes('COMMON_TYPES', [
  'POST_LAUNCH_BOT_SUCCESS',
  'POST_LAUNCH_BOT_FAILURE',

  'POST_KILL_BOT_SUCCESS',
  'POST_KILL_BOT_FAILURE'
]);

export default CONNECTION_TYPES;
