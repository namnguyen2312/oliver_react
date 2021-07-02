import React, { PropTypes } from 'react';
import { Field } from 'redux-form';

const ViewerInputFields = ({ fields }) => (
  <div className="form-group">
    <p className="alert-over">Viewer Input</p>
    <div className="row">
      <div className="col-md-3">
        <button
          type="button"
          onClick={() => fields.push()}
          disabled={fields.length >= 6}
        >
          + Add
        </button>
      </div>
      <div className="col-md-9 col-md-pull-1 add-input">
        {
          fields.map((field, index) =>
            <div key={index}>
              <Field
                name={field}
                component="input"
                type="text"
                className="form-control"
              />
              <span onClick={() => fields.remove(index)}>
                <i className="fa fa-times" aria-hidden="true" />
              </span>
            </div>
          )
        }
      </div>
    </div>
    <h5>What do you need form your viewers? <span>See example</span></h5>
  </div>
);

ViewerInputFields.propTypes = {
  fields: PropTypes.shape({}).isRequired,
};

export default ViewerInputFields;
