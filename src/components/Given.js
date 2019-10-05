import React from 'react';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { selectors, actions } from '../store';
import When from './When';
import And from './And';

const useStyles = createUseStyles({
  container: {
    borderBottom: '1px solid lightGrey',
    paddingBottom: '0.3rem',
  },
  given: {
    backgroundColor: 'white',
    borderBottom: '1px dotted lightGrey',
    display: 'flex',
    fontSize: '1.6rem',
    position: 'sticky',
    top: '0',
    zIndex: '10',
    paddingBottom: '1px',
  },
  ands: {
    marginLeft: '1rem',
  },
  addWhen: {
    fontSize: '1.3rem',
  },
  addAnd: {
    color: 'lightGrey',
  }
})

const Given = ({
  given,
  updateText,
  addAnd,
  deleteAnd,
  updateAndText,
  addWhen,
  deleteGiven,
}) => {
  const cns = useStyles();
  return (
    <div className={cns.container}>
      <div className={cns.given}>
        <button tabIndex="-1" className="delete-button" onClick={deleteGiven}>X</button>
        <label>GIVEN</label>
        <input value={given.text} onChange={updateText} />
        <button tabIndex="-1" className={cns.addAnd} onClick={addAnd}>+ and</button>
      </div>
      <div className={cns.ands}>
        {given.ands.map(and => (
          <And key={and.id} and={and} updateText={updateAndText} deleteAnd={deleteAnd} />
        ))}
      </div>
      {given.whenIds.map(whenId => (
        <When key={whenId} givenId={given.id} whenId={whenId} />
      ))}
      <button tabIndex="-1" className={cns.addWhen} onClick={addWhen}>+ WHEN</button>
    </div>
  )
};

const mapStateToProps = (state, { givenId }) => {
  const selectGivenById = selectors.given.makeSelectById();

  return (state) => ({
    given: selectGivenById(state, givenId),
  })
}

const mapDispatchToProps = (dispatch, { givenId }) => ({
  updateText: event => dispatch(actions.given.updateText({
    text: event.target.value,
    id: givenId,
  })),
  addAnd: () => dispatch(actions.given.addAnd(givenId)),
  deleteAnd: andId => dispatch(actions.given.deleteAnd({
    andId, givenId,
  })),
  updateAndText: (andId, text) => dispatch(actions.given.updateAndText({
    andId,
    text,
  })),
  addWhen: () => dispatch(actions.given.addWhen(givenId)),
  deleteGiven: () => dispatch(actions.given.delete(givenId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Given);