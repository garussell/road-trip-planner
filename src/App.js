import React from 'react';
import WeatherComponent from './components/Weather/WeatherComponent';
import BookComponent from './components/Books/BookComponent';
import RoadTripComponent from './components/RoadTrip/RoadTripComponent';
import { LocationProvider } from './components/Location/LocationContext';
import Navbar from './components/Navbar/Navbar';

import './App.css';
import { AuthProvider, useAuth } from './components/Auth/AuthContext';

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <div className="App">
          <Navbar />
          <header className="App-header">
            <h1>Road Trip Planner</h1>
            <InnerHeader />
          </header>
            <div className="App-body">
              <WeatherComponent />
              <hr className="section-divider" />
              <BookComponent />
            </div>
        </div>
      </LocationProvider>
    </AuthProvider>
  );
}

function InnerHeader() {
  const apiKey = useAuth().apiKey;
  return apiKey && <RoadTripComponent />;
}

export default App;
