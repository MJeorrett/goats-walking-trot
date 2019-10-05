import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
  },
  label: {
    color: 'grey',
  },
  deleteButton: {
    fontWeight: 'light',
  },
});

const And = ({
  and,
  updateText,
  deleteAnd,
}) => {
  const cns = useStyles();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className={cns.container}>
      <button
        className={classNames(cns.deleteButton, 'delete-button')}
        tabIndex="-1"
        onClick={() => deleteAnd(and.id)}
      >
        X
      </button>
      <label for={`and-${and.id}`} className={cns.label}>and</label>
      <input
        id={`and-${and.id}`}
        value={and.text}
        onChange={event => updateText(and.id, event.target.value)}
        ref={inputRef}
      />
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