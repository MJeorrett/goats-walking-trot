import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors, actions } from './GwtStore';

const When = ({
  when,
  updateText,
}) => {
  return (
    <div>
      <input placeholder="When" value={when.text} onChange={updateText} />
    </div>
  )
}

const mapStateToProps = (state, { whenId }) => {
  const selectWhenById = selectors.when.makeSelectById();

  return state => ({
    when: selectWhenById(state, whenId),
  });
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateText: event => dispatch(actions.when.updateText({
    id: ownProps.whenId,
    text: event.target.value,
  }))
})

When.propTypes = {
  whenId: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(When);
