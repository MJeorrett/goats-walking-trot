import React from 'react';
import PropTypes from 'prop-types';

const And = ({
  and,
  updateText,
  deleteAnd,
}) => {
  return (
    <div key={and.id} className="flex-container">
      <label>AND</label>
      <input value={and.text} onChange={event => updateText(and.id, event.target.value)}/>
      <button className="delete-button" onClick={() => deleteAnd(and.id)}>X</button>
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