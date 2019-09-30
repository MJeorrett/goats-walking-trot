import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors, actions } from '../store';
import Then from './Then';
import And from './And';

import './When.css';

const When = ({
  when,
  updateText,
  addAnd,
  deleteWhen,
  deleteAnd,
  updateAndText,
  addThen
}) => {
  return (
    <div className="when-container">
      <div className="flex-container">
        <button className="delete-button" onClick={deleteWhen}>X</button>
        <label>WHEN</label>
        <input value={when.text} onChange={updateText} />
        <button onClick={addAnd}>+ AND</button>
      </div>
      <div className="thens-container">
        <div>
          {when.ands.map(and => (
            <And key={and.id} and={and} updateText={updateAndText} deleteAnd={deleteAnd} />
          ))}
        </div>
        {when.thenIds.map(thenId => <Then key={thenId} whenId={when.id} thenId={thenId} />)}
        <button onClick={addThen}>+ THEN</button>
      </div>
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
