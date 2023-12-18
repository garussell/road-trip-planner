// WeatherComponent.js
import React, { useState, useEffect, useCallback } from 'react';
import fetchWeatherData from '../../services/weatherBooksPictureService'; 
import { useLocation } from '../Location/LocationContext';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const { location } = useLocation();

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch (error) {
      // Handle errors if needed
    }
  }, [location]);

  useEffect(() => {
    fetchData();
  }, [location, fetchData]);
  
  console.log('weatherData', weatherData);

  return (
    <div className="container mt-4 mb-4">
      <h2>Weather Forecast</h2>
      <div>
        <img 
          src={weatherData && weatherData.data.attributes.picture_data.image.image_url}
          alt="Weather Icon"
          style={{ width: '300px', height: '300px', marginRight: '20px' }}
          className="img-thumbnail"
        />
        <div>
          {weatherData && weatherData.data && weatherData.data.attributes && weatherData.data.attributes.picture_data && (
          <h6>
            Photo Credit: {weatherData.data.attributes.picture_data.image.credit.author}, Unsplash.com
          </h6>
        )}
        </div>
      </div>

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
                    <h6 className="card-title">{weatherData.data.attributes.picture_data.location}</h6>
                    <p>High: {day.max_temp} F</p>
                    <p>Low: {day.min_temp} F</p>
                    <p>Conditions: {weatherData.data.attributes.book_data.forecast.summary}</p>
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
