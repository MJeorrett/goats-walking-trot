import React from 'react';
import { connect } from 'react-redux';

import { selectors, actions } from './GwtStore';
import Given from './Given';

import './GwtsContainer.css';

const GwtsContainer = ({
  addGwt,
  givenIds
}) => {
  return (
    <div className="gwts-container">
      <button className="add-gwt-button top-button" onClick={() => addGwt(true)}>+ GWT </button>
      <div className="givens-container">
        {givenIds.map(givenId => <Given key={givenId} givenId={givenId} />)}
      </div>
      {
        givenIds.length > 0 &&
          <button className="add-gwt-button bottom-button" onClick={() => addGwt(false)}>+ GWT </button>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  givenIds: selectors.given.selectAllIds(state),
});

const mapDispatchToProps = {
  addGwt: actions.addGwt
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GwtsContainer);