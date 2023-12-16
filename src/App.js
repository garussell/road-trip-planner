import React from 'react';
import WeatherComponent from './components/Weather/WeatherComponent';
import BookComponent from './components/Books/BookComponent';
import { LocationProvider } from './components/Location/LocationContext';
import LocationInput from './components/Location/LocationInput';

import './App.css';

function App() {
  return (
    <LocationProvider>
      <div className="App">
        <header className="App-header">
          <h1>Road Trip Planner</h1>
          <p>Enter your destination below to get started!</p>
          <LocationInput />
        </header>
        <div className="App-body">
          <WeatherComponent />
          <hr className="section-divider" />
          <BookComponent />
        </div>
      </div>
    </LocationProvider>
  );
}

export default App;
