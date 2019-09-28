import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors, actions } from './GwtStore';
import Then from './Then';

const When = ({
  when,
  updateText,
  addThen
}) => {
  return (
    <div>
      <input placeholder="When" value={when.text} onChange={updateText} />
      <button onClick={addThen}>+ Then</button>
      {when.thenIds.map(thenId => <Then key={thenId} thenId={thenId} />)}
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
  addThen: () => dispatch(actions.then.add(whenId))
})

When.propTypes = {
  whenId: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(When);
