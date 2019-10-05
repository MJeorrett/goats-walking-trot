import React from 'react';
import { connect } from 'react-redux';

import { selectors, actions } from '../store';
import When from './When';
import And from './And';
import Concertina from './Concertina';

import './Given.css';

const Given = ({
  given,
  updateText,
  addAnd,
  deleteAnd,
  updateAndText,
  addWhen,
  deleteGiven,
}) => {
  return (
    <Concertina
      borderStyle='1px solid dodgerBlue'
      borderRadius='3px'
      stopMarginTop='1em'
      headerContent={() => (
        <div className="flex-container given-input-container">
          <button className="delete-button" onClick={deleteGiven}>X</button>
          <label className="given-label">GIVEN</label>
          <input className="given-input" value={given.text} onChange={updateText} />
          <button onClick={addAnd}>+ AND</button>
        </div>
      )}
      mainContent={() => (
        <>
          <div>
            {given.ands.map(and => (
              <And key={and.id} and={and} updateText={updateAndText} deleteAnd={deleteAnd} />
            ))}
          </div>
          {given.whenIds.length > 0 &&
            <div className="whens">
              {given.whenIds.map(whenId => (
                <When key={whenId} givenId={given.id} whenId={whenId} />
              ))}
            </div>
          }
        </>
      )}
      footerContent={() => (
        <div className="add-when-container">
          <button onClick={addWhen}>+ WHEN</button>
        </div>
      )}
    />
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