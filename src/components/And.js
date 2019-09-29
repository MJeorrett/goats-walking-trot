import React from 'react';
import PropTypes from 'prop-types';

const And = ({
  and,
  updateAndText,
}) => {
  return (
    <div key={and.id} className="flex-container">
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <label>AND</label>
      </div>
      <input value={and.text} onChange={event => updateAndText(and.id, event.target.value)}/>
    </div>
  );
};

And.propTypes = {
  and: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  updateAndText: PropTypes.func.isRequired,
}

export default And;