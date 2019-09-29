import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors, actions } from './GwtStore';
import And from './And';

import './Then.css';

const Then = ({
  then,
  updateText,
  addAnd,
  deleteAnd,
  updateAndText,
}) => {
  return (
    <div className="then-container">
      <div className="flex-container">
        <label>THEN</label>
        <input value={then.text} onChange={updateText} />
        <button onClick={addAnd}>+ AND</button>
      </div>
      <div className="ands-container">
        {then.ands.map(and => (
          <And key={and.id} and={and} updateText={updateAndText} deleteAnd={deleteAnd} />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state, { thenId }) => {
  const selectThenById = selectors.then.makeSelectById();

  return state => ({
    then: selectThenById(state, thenId),
  });
}

const mapDispatchToProps = (dispatch, { thenId }) => ({
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
})

Then.propTypes = {
  thenId: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Then);