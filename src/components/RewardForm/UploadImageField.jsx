import React, { PropTypes } from 'react';

const UploadImageField = ({ input }) => (
  <div className="form-group">
    <label htmlFor={input.name}>
      Upload Image <span>(Optional)</span>
    </label>
    <div className="input-file">
      <span className="choose-file">Choose file</span>
      <input
        {...input}
        type="file"
        className="form-control"
        id={input.name}
      />
      <span className="upload">Upload</span>
    </div>
    <h5>
      Image size recommendation: 196px x 196px (.PNG, .JPG, .GIF, .SVG).
      Max size 5MB
    </h5>
  </div>
);

UploadImageField.propTypes = {
  input: PropTypes.shape({}).isRequired,
};

export default UploadImageField;
