import React from 'react';
import { connect } from 'react-redux';

import { selectors, actions } from './GwtStore';
import When from './When';
import And from './And';

import './Given.css';

const Given = ({
  given,
  updateText,
  addAnd,
  deleteAnd,
  updateAndText,
  addWhenThen,
}) => {
  return (
    <div className="given-container">
      <div className="flex-container">
        <label className="given-label">GIVEN</label>
        <input className="given-input" value={given.text} onChange={updateText} />
        <button onClick={addAnd}>+ AND</button>
      </div>
      <div className="whens-container">
        <div>
          {given.ands.map(and => (
            <And and={and} updateText={updateAndText} deleteAnd={deleteAnd} />
          ))}
        </div>
        {given.whenIds.map(whenId => <When key={whenId} whenId={whenId} />)}
        <button onClick={addWhenThen}>+ WHEN/THEN</button>
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
  addWhenThen: () => dispatch(actions.given.addWhenThen(givenId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Given);