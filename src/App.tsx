import React from 'react';
import './App.css';
import Math from './components/math/functions';
import {Content} from './components/content-prepare/content-prepare';

Math.Settings.division = true;
Math.Settings.multiply = true;
Math.Settings.count = 30;

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Content/>
      </header>
    </div>
  );
}

export default App;
