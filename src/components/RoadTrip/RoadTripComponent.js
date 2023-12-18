// RoadTripComponent.js
import React, { useState } from 'react';
import useRoadTripData from '../../services/roadTripService';
import { useAuth } from '../Auth/AuthContext';
import { useLocation } from '../Location/LocationContext';

const RoadTripComponent = () => {
  const { roadTripData, fetchRoadTripData } = useRoadTripData();
  const [origin, setOrigin] = useState('');
  const { location, setLocation } = useLocation();
  const { apiKey } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {    
      await fetchRoadTripData(origin, location);
      
      setLocation(location);

    } catch (error) {
      console.error('Error handling form submission:roadTripComponent', error);
    }
  };

  let formattedArrivalTime = 'N/A';

  if (roadTripData && roadTripData.data && roadTripData.data.attributes && roadTripData.data.attributes.weather_at_eta) {
    const arrivalTime = new Date(roadTripData.data.attributes.weather_at_eta.datetime);
    
    formattedArrivalTime = arrivalTime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    });
  }
  
  console.log('roadTripData', roadTripData);

  return (
    <div className="container">
      {apiKey && (
        <div>
          <form onSubmit={handleFormSubmit}>
            <label>
              Origin
              <input
                className="form-control"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </label>
            <br />
            <label>
              Destination
              <input
                className="form-control"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <br />
            <button 
              className="btn btn-primary mt-2"
              type="submit">Plan Road Trip
            </button>
          </form><br />

          {roadTripData && (
            <div className="col-md-6 mx-auto mb-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Origin: {roadTripData.data.attributes.start_city}</h4>
                  <h4 className="card-title">Destination: {roadTripData.data.attributes.end_city}</h4>
                  <p>Travel Time: {roadTripData.data.attributes.travel_time}</p>
                  <p>Arrival Time: {formattedArrivalTime}</p>
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
