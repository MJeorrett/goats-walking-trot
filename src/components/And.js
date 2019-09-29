import React from 'react';
import PropTypes from 'prop-types';

const And = ({
  and,
  updateText,
  deleteAnd,
}) => {
  return (
    <div className="flex-container">
      <button tabIndex="-1" className="delete-button" onClick={() => deleteAnd(and.id)}>X</button>
      <label>AND</label>
      <input value={and.text} onChange={event => updateText(and.id, event.target.value)}/>
    </div>
  );
};

And.propTypes = {
  and: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  updateText: PropTypes.func.isRequired,
  deleteAnd: PropTypes.func.isRequired, 
}

export default And;