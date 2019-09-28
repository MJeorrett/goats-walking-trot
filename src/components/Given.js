import React from 'react';
import { connect } from 'react-redux';

import { selectors, actions } from './GwtStore';
import When from './When';

const Given = ({
  given,
  updateText,
  addWhen,
}) => {
  return (
    <div>
      <input placeholder="Given" value={given.text} onChange={updateText} />
      <button onClick={addWhen}>+ When</button>
      <div>
        {given.whenIds.map(whenId => <When key={whenId} whenId={whenId} />)}
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
  addWhen: () => dispatch(actions.when.add(givenId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Given);