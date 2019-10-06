import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { selectors, actions } from '../store';
import Then from './Then';
import And from './And';

const useStyles = createUseStyles({
  whenContainer: {
    marginLeft: '1rem',
  },
  when: {
    backgroundColor: 'white',
    borderBottom: '1px dotted lightGrey',
    display: 'flex',
    fontSize: '1.3rem',
    position: 'sticky',
    top: '4.2rem',
  },
  ands: {
    borderBottom: '1px dotted lightGrey',
    paddingBottom: '1px',
  },
  whenContents: {
    marginLeft: '1rem',
  },
  addThen: {
    color: 'lightGrey',
    marginLeft: '1.6rem',
  },
  addAnd: {
    color: 'lightGrey',
    marginLeft: '0.6rem',
  },
});

const When = ({
  when,
  updateText,
  addAnd,
  deleteWhen,
  deleteAnd,
  updateAndText,
  addThen
}) => {
  const cns = useStyles();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className={cns.whenContainer}>
      <div className={cns.when}>
        <button tabIndex="-1" className="delete-button" onClick={deleteWhen}>X</button>
        <label>WHEN</label>
        <input value={when.text} onChange={updateText} ref={inputRef} />
      </div>
      <div className={cns.whenContents}>
        <div className={cns.ands}>
          {when.ands.map(and => (
            <And key={and.id} and={and} updateText={updateAndText} deleteAnd={deleteAnd} />
          ))}
          <button tabIndex="-1" className={cns.addAnd} onClick={addAnd}>+ and</button>
        </div>
        <div className={cns.thens}>
          {when.thenIds.map(thenId => <Then key={thenId} whenId={when.id} thenId={thenId} />)}
        </div>
      </div>
      {when.thenIds.length === 0 && <button className={cns.addThen} tabIndex="-1" onClick={addThen}>+ THEN</button>}
    </div>
  )
}

const mapStateToProps = (state, { whenId }) => {
  const selectWhenById = selectors.when.makeSelectById();

  return state => ({
    when: selectWhenById(state, whenId),
  });
}

const mapDispatchToProps = (dispatch, { whenId, givenId }) => ({
  updateText: event => dispatch(actions.when.updateText({
    id: whenId,
    text: event.target.value,
  })),
  addThen: () => dispatch(actions.when.addThen(whenId)),
  addAnd: () => dispatch(actions.when.addAnd(whenId)),
  deleteAnd: andId => dispatch(actions.when.deleteAnd({
    andId, whenId,
  })),
  updateAndText: (andId, text) => dispatch(actions.when.updateAndText({
    andId,
    text,
  })),
  deleteWhen: () => dispatch(actions.given.deleteWhen(givenId, whenId)),
})

When.propTypes = {
  // TODO: avoid this if possible
  givenId: PropTypes.string.isRequired,
  whenId: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(When);
