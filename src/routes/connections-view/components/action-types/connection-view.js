/**
 * Connection view actions
 */
import createActionTypes from '../../../../utils/action-type-factory';

const CONNECTION_TYPES = createActionTypes('CONNECTION_TYPES', [
  'GET_FACEBOOK_CONNECTION_REQUEST',
  'GET_FACEBOOK_CONNECTION_SUCCESS',
  'GET_FACEBOOK_CONNECTION_FAILURE',
]);

export default CONNECTION_TYPES;
