import React from 'react';

import './GoatsWalkingTrot.css';

class GoatsWalkingTrot extends React.Component {
  render() {
    return <div className="gwt-container">
      <form>
        <div className="field">
          <label>GIVEN</label>
          <input type="text" placeholder="What is the precondition?" />
          <button type="button">+ AND</button>
        </div>
        <div className="when-then-container">
          <div className="add-when-container">
            <button type="button">+ WHEN / THEN</button>
          </div>
          <div className="field when-field">
            <label>WHEN</label>
            <input type="text" placeholder="What is the behaviour?" />
            <button type="button">+ AND</button>
          </div>
          <div className="field then-field">
            <label>THEN</label>
            <input type="text" placeholder="What happens?" />
            <button type="button">+ AND</button>
          </div>
        </div>
      </form>
    </div>
  }
}

export default GoatsWalkingTrot;