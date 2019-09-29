import React from 'react';
import { connect } from 'react-redux';

import { selectors, actions } from './GwtStore';
import When from './When';

import './Given.css';

const Given = ({
  given,
  updateText,
  addWhenThen,
}) => {
  return (
    <div className="given-container">
      <div className="flex-container">
        <input className="given-input" placeholder="Given" value={given.text} onChange={updateText} />
      </div>
      <div className="whens-container">
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
  addWhenThen: () => dispatch(actions.given.addWhenThen(givenId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Given);