import React from 'react';
import WeatherComponent from './components/Weather/WeatherComponent';
import BookComponent from './components/Books/BookComponent';
import RoadTripComponent from './components/RoadTrip/RoadTripComponent';
import MovieComponent from './components/Movies/MovieComponent';
import { LocationProvider } from './components/Location/LocationContext';
import Navbar from './components/Navbar/Navbar';

import './App.css';
import { AuthProvider, useAuth } from './components/Auth/AuthContext';


function BookHeader() {
  const apiKey = useAuth().apiKey;
  return apiKey && <BookComponent />;
}

function WeatherHeader() {
  const apiKey = useAuth().apiKey;
  return apiKey && <WeatherComponent />;
}

function RoadTripHeader() {
  const apiKey = useAuth().apiKey;
  return apiKey && <RoadTripComponent />;
}

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <div className="App">
          <Navbar />
          <header className="App-header">
            <h1>Road Trip Planner</h1>
            <RoadTripHeader />
          </header>
          <div className="App-body">
            <WeatherHeader />
            <hr className="section-divider" />
            <BookHeader />
            <hr className="section-divider" />
            <MovieComponent />
          </div>
        </div>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;
