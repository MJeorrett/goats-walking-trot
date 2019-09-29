import React from 'react';
import { connect } from 'react-redux';

import { selectors, actions } from './GwtStore';
import When from './When';

import './Given.css';

const Given = ({
  given,
  updateText,
  addAnd,
  updateAndText,
  addWhenThen,
}) => {
  return (
    <div className="given-container">
      <div className="flex-container">
        <input className="given-input" placeholder="Given" value={given.text} onChange={updateText} />
        <button onClick={addAnd}>+ AND</button>
      </div>
      <div className="whens-container">
        <div>
          {renderAnds(given.ands, updateAndText)}
        </div>
        {given.whenIds.map(whenId => <When key={whenId} whenId={whenId} />)}
        <button onClick={addWhenThen}>+ WHEN/THEN</button>
      </div>
    </div>
  )
};

function renderAnds(ands, updateAndText) {
  return ands.map(and => (
    <div>
      <label>AND</label>
      <input value={and.text} onChange={event => updateAndText(and.id, event.target.value)}/>
    </div>
  ));
}

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