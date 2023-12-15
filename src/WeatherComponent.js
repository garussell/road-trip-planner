// WeatherComponent.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [location, setLocation] = useState('Denver, CO');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/data', {
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
        Destination
        <input
          className="form-control"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      {weatherData && (
        <div className="row">
          {weatherData.data.attributes.weather_data.daily_weather.map((day, index) => {
            const dateObject = new Date(day.date_epoch * 1000);
            const formattedDate = new Intl.DateTimeFormat('en-AU', {
              weekday: 'long',
              day: 'numeric',
              year: 'numeric',
              timeZone: weatherData.data.attributes.weather_data.timezone,
            }).format(dateObject);
          
            return (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{`${formattedDate}`}</h5>
                    <p>High: {day.max_temp} F</p>
                    <p>Low: {day.min_temp} F</p>
                    <p>Conditions: {day.condition}</p>
                    <p>Sunrise: {day.sunrise}</p>
                    <p>Sunset: {day.sunset}</p>
                    <img src={day.icon} alt="Weather Icon" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
