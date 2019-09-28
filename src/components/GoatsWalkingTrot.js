import React from 'react';
import { connect } from 'react-redux';

import { actions, selectors } from './GwtStore';

import './GoatsWalkingTrot.css';

const { addGiven, addWhen, addThen } = actions;

class GoatsWalkingTrot extends React.Component {
  render = () => {
    return (
      <div className="gwt-container">
        <form>
          <div className="add-gwt-container">
            <button
              type="button"
              className="add-button add-given-button"
              onClick={() => this.props.addGiven()}
              >
              + GIVEN
            </button>
          </div>
          <div className="field given-field">
            <label>GIVEN</label>
            <input type="text" placeholder="What is the precondition?" />
            <button type="button" className="add-button">+ AND</button>
          </div>
          <div className="add-gwt-container">
            <button type="button" className="add-button" onClick={this.props.addWhen}>+ WHEN</button>
          </div>
          <div className="when-then-container">
            <div className="field when-field">
              <label>WHEN</label>
              <input type="text" placeholder="What is the behaviour?" />
              <button type="button" className="add-button">+ AND</button>
            </div>
            <div className="field then-field">
              <label>THEN</label>
              <input type="text" placeholder="What happens?" />
              <button type="button" className="add-button">+ THEN</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ids: selectors.given.selectAllIds,
  }
}

const mapDispatchToProps = {
  addGiven: () => addGiven("test"),
  addWhen: () => addWhen({
    givenId: "test-given-id",
    text: "test when"
  }),
  addThen: () => addThen({
    whenId: "test-when-id",
    text: "test then"
  }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoatsWalkingTrot);