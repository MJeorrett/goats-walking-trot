import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors, actions } from './GwtStore';
import Then from './Then';
import And from './And';

import './When.css';

const When = ({
  when,
  updateText,
  addAnd,
  updateAndText,
  addThen
}) => {
  return (
    <div className="when-container">
      <div className="flex-container">
        <input placeholder="When" value={when.text} onChange={updateText} />
        <button onClick={addAnd}>+ AND</button>
      </div>
      <div className="thens-container">
        <div>
          {when.ands.map(and => (
            <And and={and} updateAndText={updateAndText} />
          ))}
        </div>
        {when.thenIds.map(thenId => <Then key={thenId} thenId={thenId} />)}
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

const mapDispatchToProps = (dispatch, { whenId }) => ({
  updateText: event => dispatch(actions.when.updateText({
    id: whenId,
    text: event.target.value,
  })),
  addThen: () => dispatch(actions.then.add(whenId)),
  addAnd: () => dispatch(actions.when.addAnd(whenId)),
  updateAndText: (andId, text) => dispatch(actions.when.updateAndText({
    andId,
    text,
  })),
})

When.propTypes = {
  whenId: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(When);
