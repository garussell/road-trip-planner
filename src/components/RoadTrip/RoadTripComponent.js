// RoadTripComponent.js
import React, { useState } from 'react';
import useRoadTripData from '../../services/roadTripService';
import { useAuth } from '../Auth/AuthContext';

const RoadTripComponent = () => {
  const { roadTripData, fetchRoadTripData } = useRoadTripData();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const { apiKey } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetchRoadTripData(origin, destination);
    } catch (error) {
      console.error('Error handling form submission:', error);
    }
  };

  return (
    <div>
      {apiKey && (
        <div>
          <form onSubmit={handleFormSubmit}>
            <label>
              Origin
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </label>
            <br />
            <label>
              Destination
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Plan Road Trip</button>
          </form>

          {roadTripData && (
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5>Origin: {roadTripData.data.attributes.start_city}</h5>
                  <p>Destination: {roadTripData.data.attributes.end_city}</p>
                  <p>Travel Time: {roadTripData.data.attributes.travel_time}</p>
                  <p>Weather at ETA: {roadTripData.data.attributes.weather_at_eta.temperature}F</p>
                  <p>Condition: {roadTripData.data.attributes.weather_at_eta.condition}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoadTripComponent;
