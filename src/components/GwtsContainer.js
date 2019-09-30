import React from 'react';
import { connect } from 'react-redux';

import { selectors, actions } from '../store';
import Given from './Given';

import './GwtsContainer.css';

const GwtsContainer = ({
  addGiven,
  givenIds
}) => {
  return (
    <div className="gwts-container">

      {renderAddGivenButton(() => addGiven(true))}

      <div className="givens-container">
        {givenIds.map(givenId => <Given key={givenId} givenId={givenId} />)}
      </div>

      {givenIds.length > 0 && renderAddGivenButton(() => addGiven(false))}
      
    </div>
  )
}

function renderAddGivenButton(clickHandler) {
  return (
    <button className="add-gwt-button top-button" onClick={clickHandler}>+ GIVEN </button>
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