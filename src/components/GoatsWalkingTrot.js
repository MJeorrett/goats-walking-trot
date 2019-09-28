import React from 'react';
import { connect } from 'react-redux';

import { actions } from './GwtStore';

import './GoatsWalkingTrot.css';

const { addGiven } = actions;

class GoatsWalkingTrot extends React.Component {
  render = () => {
    return (
      <div className="gwt-container">
        {JSON.stringify(this.props.gwts)}
        <button onClick={() => this.props.addGiven()}>Test Add Given</button>
        <form>
          <div className="field">
            <label>GIVEN</label>
            <input type="text" placeholder="What is the precondition?" />
            <button type="button" className="add-button">+ AND</button>
          </div>
          <div className="when-then-container">
            <div className="add-when-container">
              <button type="button" className="add-button">+ WHEN / THEN</button>
            </div>
            <div className="field when-field">
              <label>WHEN</label>
              <input type="text" placeholder="What is the behaviour?" />
              <button type="button" className="add-button">+ AND</button>
            </div>
            <div className="field then-field">
              <label>THEN</label>
              <input type="text" placeholder="What happens?" />
              <button type="button" className="add-button">+ AND</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    gwts: state.gwts,
  }
}

const mapDispatchToProps = {
  addGiven: () => addGiven("test")
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoatsWalkingTrot);