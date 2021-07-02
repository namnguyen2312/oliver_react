/**
 * Validating reward form
 */
import { assign } from 'lodash';
import { SubmissionError } from 'redux-form';

import { submitReward } from 'routes/rewards-view/action-creators/rewards-view';
import listCooldown from 'data/cool-down';
import listMaxRedemptionRule from 'data/max-redemption-rule';
import listLimitPerViewRule from 'data/limit-per-view-rule';

export default function validate(fields, dispatch) {
  const values = assign(fields);
  const errors = {};

  if (!values.name) {
    errors.name = 'This field is required';
  }

  if (!values.point) {
    errors.point = 'This field is required';
  }
  else if (isNaN(values.point)) {
    errors.point = 'This field must be a number';
  }
  else {
    values.point = parseInt(values.point, 10);
  }

  if (!values.cooldown) {
    errors.cooldown = 'This field is required';
  }
  else if (listCooldown.includes(values.cooldown)) {
    errors.cooldown = 'Cooldown does not exist';
  }

  if (values.max_redemption_rule) {
    if (typeof values.max_redemption_rule.status === 'undefined') {
      values.max_redemption_rule.status = false;
    }

    if (typeof values.max_redemption_rule.amount === 'undefined') {
      values.max_redemption_rule.amount = 0;
    }
    else if (!isNaN(values.max_redemption_rule.amount)) {
      values.max_redemption_rule.amount = parseInt(values.max_redemption_rule.amount, 10);
    }

    if (!listMaxRedemptionRule.includes(values.max_redemption_rule.redemption_time_reset)) {
      values.max_redemption_rule.redemption_time_reset = listMaxRedemptionRule[0].key;
    }
  }

  if (values.limit_per_view_rule) {
    if (typeof values.limit_per_view_rule.status === 'undefined') {
      values.limit_per_view_rule.status = false;
    }

    if (typeof values.limit_per_view_rule.amount === 'undefined') {
      values.limit_per_view_rule.amount = 0;
    }
    else if (!isNaN(values.limit_per_view_rule.amount)) {
      values.limit_per_view_rule.amount = parseInt(values.limit_per_view_rule.amount, 10);
    }

    if (!listLimitPerViewRule.includes(values.limit_per_view_rule.view_time_reset)) {
      values.limit_per_view_rule.view_time_reset = listLimitPerViewRule[0].key;
    }
  }

  if (values.redemption_message) {
    delete errors.redemption_message;

    if (typeof values.redemption_message.status === 'undefined') {
      values.redemption_message.status = false;
    }

    if (typeof values.redemption_message.message === 'undefined') {
      values.redemption_message.message = '';
    }

    if (values.redemption_message.status && !values.redemption_message.message.trim().length) {
      errors.redemption_message = 'Please fill out this field';
    }
  }

  if (values.viewer_input_fields && values.viewer_input_fields.length) {
    values.viewer_input_fields = values.viewer_input_fields.filter(field => (!!field));

    if (values.viewer_input_fields.length > 6) {
      errors.viewer_input_fields = 'No more than six fields allowed';
    }
  }

  delete values.gift_code;

  if (Object.keys(errors).length) {
    throw new SubmissionError(errors);
  }

  dispatch(submitReward(values));
}
