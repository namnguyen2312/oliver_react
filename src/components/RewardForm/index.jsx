import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

import listCooldown from 'data/cool-down';
import listMaxRedemptionRule from 'data/max-redemption-rule';
import listLimitPerViewRule from 'data/limit-per-view-rule';
import { deleteReward } from 'routes/rewards-view/action-creators/rewards-view';

import GiftCodeField from './GiftCodeField';
import RedemptionMessageField from './RedemptionMessageField';
import UploadImageField from './UploadImageField';
import validate from './validate';
import ViewerInputFields from './ViewerInputFields';

class RewardForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    deleteReward: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    selectedReward: PropTypes.shape({}).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      isHideAdvancedSetting: true
    };
  }

  handleHideAdvancedSetting = (e) => {
    e.preventDefault();

    this.setState({
      isHideAdvancedSetting: !this.state.isHideAdvancedSetting
    });
  }

  handleDeleteReward = () => {
    const { selectedReward } = this.props;

    if (Object.keys(selectedReward).length) {
      this.props.deleteReward(selectedReward);
    }
  }

  renderInput = ({ input, label, type, meta: { error }, required = true, note }) => (
    <div className="form-group">
      <label htmlFor={input.name}>{label} {required ? '*' : <span>(Optional)</span>}</label>
      <input
        {...input}
        type={type}
        placeholder={label}
        id={input.name}
        className="form-control"
      />
      {note && <h5>{note}</h5>}
      {error && <span className="error">{error}</span>}
    </div>
  )

  renderSelect = ({ input, label, meta: { error }, required = true, note, options = [] }) => (
    <div className="form-group reward-cooldown">
      <label htmlFor={input.name}>{label} {required ? '*' : <span>(Optional)</span>}</label>
      <Field name={input.name} id={input.name} component="select">
        <option value="">Choose</option>
        {
          options.map(option => <option key={option.key} value={option.key}>{option.val}</option>)
        }
      </Field>
      {note && <h5>{note}</h5>}
      {error && <span className="error">{error}</span>}
    </div>
  )

  renderAdvancedSelect = ({ input, label, meta: { error }, note, options, childs }) => (
    <div className="form-group view-redeem">
      <label htmlFor={input.name}>{label}</label>
      <Field
        type="text"
        className="form-control"
        name={`${input.name}.${childs[1]}`}
        id={input.name}
        component="input"
      />
      <span>{note}</span>
      <Field name={`${input.name}.${childs[2]}`} component="select">
        <option value="">Choose</option>
        {
          options.map(option => <option key={option.key} value={option.key}>{option.val}</option>)
        }
      </Field>
      <div className="switch-btn">
        <Field
          type="checkbox"
          name={`${input.name}.${childs[0]}`}
          id={`${input.name}.${childs[0]}`}
          component="input"
        />
        <label htmlFor={`${input.name}.${childs[0]}`} />
      </div>
      {error && <span className="error">error</span>}
    </div>
  )

  render() {
    const { handleSubmit, submitting, selectedReward } = this.props;
    const { isHideAdvancedSetting } = this.state;

    return (
      <form onSubmit={handleSubmit(validate)}>
        <Field
          name="name"
          type="text"
          component={this.renderInput}
          label="Name of reward"
        />
        <Field
          name="point"
          type="text"
          component={this.renderInput}
          label="Price"
        />
        <Field
          name="bot_command"
          type="text"
          component={this.renderInput}
          label="Bot Command"
          required={false}
          note="Leave it blank if you dont want this reward on the bot."
        />
        <Field
          name="cooldown"
          component={this.renderSelect}
          label="Reward Cooldown"
          note="Set a time limit between redemptions."
          options={listCooldown}
        />
        <Field
          name="upload_image"
          component={UploadImageField}
        />
        <div className="form-group">
          <p className="alert-over">
            Alert Overlay <span>(Optional)</span>
          </p>
          <div className="over-ck">
            <input type="checkbox" id="overlayCheck-1" name="check" />
            <label htmlFor="overlayCheck-1" />Default Style
          </div>
          <div className="over-ck">
            <input type="checkbox" id="overlayCheck-2" name="check" />
            <label htmlFor="overlayCheck-2" />New Style
          </div>
          <h5>Add this reward to an existing overlay. To make changes or create new styles go to <a href="/">Overlays - Reward</a></h5>
        </div>
        <div className="toggle-setting">
          <button type="button" onClick={this.handleHideAdvancedSetting}>
            {isHideAdvancedSetting ? 'Show Advance Setting' : 'Hide Advance Setting'}
          </button>
        </div>
        <div className={`advance-stt ${isHideAdvancedSetting ? 'hide' : ''}`}>
          <FieldArray
            name="viewer_input_fields"
            component={ViewerInputFields}
          />
          <div className="form-group">
            <label htmlFor="desReward">Description of Reward</label>
            <textarea className="form-control" name="desReward" id="desReward" rows="4" />
          </div>
          <Field
            name="max_redemption_rule"
            childs={['status', 'amount', 'redemption_time_reset']}
            component={this.renderAdvancedSelect}
            label="How many of these rewards can your viewer redeem?"
            note="redemptions with resets"
            options={listMaxRedemptionRule}
          />
          <Field
            name="limit_per_view_rule"
            childs={['status', 'amount', 'view_time_reset']}
            component={this.renderAdvancedSelect}
            label="How many can a individual viewer redeem?"
            note="per viewer with resets"
            options={listLimitPerViewRule}
          />
          <Field
            name="gift-code"
            component={GiftCodeField}
          />
          <Field
            name="redemption_message"
            component={RedemptionMessageField}
            label="Redemption Message"
            labelNote="(Adding this option makes this a web only reward)"
            note="Add a custom message that fans will see when they redeem this reward."
          />
        </div>
        <div className="form-group btn-form">
          <button
            type="button"
            className="btn btn-orange"
            onClick={this.handleDeleteReward}
            disabled={!Object.keys(selectedReward).length}
          >
            Delete
          </button>
          <button
            type="submit"
            className="btn btn-orange"
            disabled={submitting}
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const selectedReward = state['rewards-view/rewards-view'].selectedReward || {};

  return {
    initialValues: selectedReward,
    selectedReward
  };
};

const mapDispatchToProps = dispatch => ({
  deleteReward: reward => dispatch(deleteReward(reward)),
});

const reduxRewardForm = reduxForm({
  form: 'reward-form',
  enableReinitialize: true
})(RewardForm);

export default connect(mapStateToProps, mapDispatchToProps)(reduxRewardForm);
