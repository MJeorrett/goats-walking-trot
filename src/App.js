import React from 'react';
import { Provider } from 'react-redux';

import './App.css';

import GwtsContainer from './components/GwtsContainer';
import store from './components/GwtStore';

function App() {
  return (
    <div id="app-container">
      <Provider store={store}>
        <h1>Goats Walking Trot</h1>
        <p>A simple app for enabling the writing of terse GWT.</p>
        <GwtsContainer />
      </Provider>
    </div>
  );
}

export default App;
