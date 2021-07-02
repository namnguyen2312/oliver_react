import React, { PropTypes } from 'react';
import { Field } from 'redux-form';

const GiftCodeField = ({ input }) => (
  <div className="form-group">
    <label htmlFor={input.name}>
      Access code
      <span> (Adding this option makes this a web only reward)</span>
    </label>
    <div className="input-file access-code">
      <span className="choose-file">Choose file</span>
      <input
        {...input}
        type="file"
        className="form-control"
        id={input.name}
      />
      <span className="upload">Upload</span>
    </div>
    <div className="switch-btn">
      <Field
        type="checkbox"
        name="check"
        component="input"
        id={`${input.name}.status`}
      />
      <label htmlFor={`${input.name}.status`} />
    </div>
    <h5>
      Upload a csv file with access codes.
       One of these will be distributed to each user who redeems this reward.
       For more info <span>check this out.</span>
    </h5>
  </div>
);

GiftCodeField.propTypes = {
  input: PropTypes.shape({}).isRequired,
};

export default GiftCodeField;
