import React, { PropTypes } from 'react';
import { Field } from 'redux-form';

const RedemptionMessageField = ({ input, label, meta: { error }, labelNote, note }) => (
  <div className="form-group">
    <label htmlFor={`${input.name}.message`}>{label} <span>{labelNote}</span></label>
    <div className="message">
      <Field
        name={`${input.name}.message`}
        component="textarea"
        className="form-control"
        id={`${input.name}.message`}
        rows="4"
      />
    </div>
    <div className="switch-btn">
      <Field
        type="checkbox"
        name={`${input.name}.status`}
        id={`${input.name}.status`}
        component="input"
      />
      <label htmlFor={`${input.name}.status`} />
    </div>
    <h5>{note}</h5>
    {error && <span className="error">{error}</span>}
  </div>
);

RedemptionMessageField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({}).isRequired,
  labelNote: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
};

export default RedemptionMessageField;
