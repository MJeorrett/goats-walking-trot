import React from 'react';
import { connect } from 'react-redux';

import { selectors, actions } from './GwtStore';
import Given from './Given';

import './GwtsContainer.css';

const GwtsContainer = ({
  addGiven,
  givenIds
}) => {
  return (
    <div className="gwts-container">
      <button className="add-gwt-button top-button" onClick={addGiven}>+ GWT </button>
      <div className="givens-container">
        {givenIds.map(givenId => <Given key={givenId} givenId={givenId} />)}
      </div>
      {
        givenIds.length > 0 &&
          <button className="add-gwt-button bottom-button" onClick={addGiven}>+ GWT </button>
      }
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