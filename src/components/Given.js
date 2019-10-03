import React from 'react';
import { connect } from 'react-redux';

import { selectors, actions } from '../store';
import When from './When';
import And from './And';

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
    <div className="given-container">
      <div className="top">
        <div class="top-mask"></div>
        <div className="flex-container given-input-container">
          <button className="delete-button delete-given" onClick={deleteGiven}>X</button>
          <label className="given-label">GIVEN</label>
          <input className="given-input" value={given.text} onChange={updateText} />
          <button onClick={addAnd}>+ AND</button>
        </div>
      </div>
      <div className="whens-container">
        <div>
          {given.ands.map(and => (
            <And key={and.id} and={and} updateText={updateAndText} deleteAnd={deleteAnd} />
          ))}
        </div>
        {given.whenIds.map(whenId => (
          <div className="when-container">
            <When key={whenId} givenId={given.id} whenId={whenId} />
          </div>
        ))}
        <div className="add-when-button">
          <button onClick={addWhen}>+ WHEN</button>
        </div>
      </div>
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