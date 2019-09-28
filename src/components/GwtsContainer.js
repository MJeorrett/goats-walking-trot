import React from 'react';
import { connect } from 'react-redux';

import { selectors, actions } from './GwtStore';
import Given from './Given';

const GwtsContainer = ({
  addGiven,
  givenIds
}) => {
  return (
    <div>
      <button onClick={addGiven}>Add Given</button>
      {givenIds.map(givenId => <Given key={givenId} givenId={givenId} />)}
    </div>
  )
}

const mapStateToProps = state => ({
  givenIds: selectors.given.selectAllIds(state),
});

const mapDispatchToProps = {
  addGiven: actions.given.add
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GwtsContainer);