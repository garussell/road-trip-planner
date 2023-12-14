import React from 'react';
import WeatherComponent from './WeatherComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Road Trip Planner</h1>
      </header>
      <div className="App-body">
        <WeatherComponent />
      </div>
    </div>
  );
}

export default App;
