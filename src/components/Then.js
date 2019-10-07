import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { selectors, actions } from '../store';
import And from './And';

const useStyles = createUseStyles({
  then: {
    display: 'flex',
  },
  ands: {
    marginLeft: '1rem',
    borderBottom: '1px dotted lightGrey',
    paddingBottom: '1px',
  },
  addAnd: {
    color: 'lightGrey',
    paddingLeft: '0.6rem',
  },
});

const Then = ({
  then,
  updateText,
  addAnd,
  deleteAnd,
  updateAndText,
  deleteThen,
}) => {
  const cns = useStyles();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <div className={cns.then}>
        <button tabIndex="-1" className="delete-button" onClick={deleteThen}>X</button>
        <label>THEN</label>
        <input value={then.text} onChange={updateText} ref={inputRef} />
      </div>
      <div className={cns.ands}>
        {then.ands.map(and => (
          <And key={and.id} and={and} updateText={updateAndText} deleteAnd={deleteAnd} />
        ))}
        <button tabIndex="-1" className={cns.addAnd} onClick={addAnd}>+ and</button>
      </div>
    </>
  )
}

const mapStateToProps = (state, { thenId }) => {
  const selectThenById = selectors.then.makeSelectById();

  return state => ({
    then: selectThenById(state, thenId),
  });
}

const mapDispatchToProps = (dispatch, { thenId, whenId }) => ({
  updateText: event => dispatch(actions.then.updateText({
    id: thenId,
    text: event.target.value,
  })),
  addAnd: () => dispatch(actions.then.addAnd(thenId)),
  deleteAnd: andId => dispatch(actions.then.deleteAnd({
    andId, thenId,
  })),
  updateAndText: (andId, text) => dispatch(actions.then.updateAndText({
    andId,
    text,
  })),
  deleteThen: () => dispatch(actions.when.deleteThen(whenId, thenId)),
})

Then.propTypes = {
  // TODO: See if this can be avoided
  whenId: PropTypes.string.isRequired,
  thenId: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Then);