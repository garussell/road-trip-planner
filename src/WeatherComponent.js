// WeatherComponent.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [location, setLocation] = useState('denver,co');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v0/forecast', {
        params: {
          location: location,
        },
      });

      console.log('API response:', response.data);

      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [location]);

  useEffect(() => {
    fetchWeatherData();
  }, [location, fetchWeatherData]);

  return (
    <div className="container mt-4 mb-4">
      <h2>Weather Forecast</h2>
      <label className="form-label">
        Location
        <input
          className="form-control"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      {weatherData && (
        <div>
          <p>Current Weather in {location}:</p>
          <p>Temperature: {weatherData.data.attributes.current_weather.temperature} F</p>
          <p>Feels Like: {weatherData.data.attributes.current_weather.feels_like} F</p>
          <p>Conditions: {weatherData.data.attributes.current_weather.condition}</p>
          <p>Humidity: {weatherData.data.attributes.current_weather.humidity}%</p>
          <img src={weatherData.data.attributes.current_weather.icon} alt="Weather Icon" />
          {/* Access other nested properties as needed */}
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
