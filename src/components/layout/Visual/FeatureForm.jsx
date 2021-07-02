import React from 'react';

const FeatureForm = () => (
  <div className="block-form">
    <form action="#">
      <textarea name="add" id="add" placeholder="You can feature your latest competition or upcoming giveaway here." />
      <input type="submit" className="button" value="Add" />
    </form>
  </div>
);

export default FeatureForm;
