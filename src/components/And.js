import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    height: '0',
    overflow: 'hidden',
    transition: 'height 0.5s ease',
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
  stickyParentBottom,
}) => {
  const cns = useStyles();
  const containerRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    containerRef.current.style.height = '2.1em';
    inputRef.current.focus();
    
    if (stickyParentBottom) {
      setTimeout(() => {
        const diff = stickyParentBottom - inputRef.current.getBoundingClientRect().top;
        if (diff > 0) {
          window.scrollBy(0, -diff - 10);
        }
      }, 500);
    }
  }, []);
  return (
    <div className={cns.container} ref={containerRef}>
      <button
        className={classNames(cns.deleteButton, 'delete-button')}
        tabIndex="-1"
        onClick={() => {
          containerRef.current.style.height = '0';
          setTimeout(() => deleteAnd(and.id), 500);
        }}
      >
        X
      </button>
      <label htmlFor={`and-${and.id}`} className={cns.label}>and</label>
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