import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors, actions } from './GwtStore';

const Then = ({
  then,
  updateText,
}) => {
  return (
    <div>
      <input placeholder="Then" value={then.text} onChange={updateText} />
    </div>
  )
}

const mapStateToProps = (state, { thenId }) => {
  const selectThenById = selectors.then.makeSelectById();

  return state => ({
    then: selectThenById(state, thenId),
  });
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateText: event => dispatch(actions.then.updateText({
    id: ownProps.thenId,
    text: event.target.value,
  }))
})

Then.propTypes = {
  thenId: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Then);