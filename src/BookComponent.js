// BookComponent.js
import React, { useEffect, useState } from "react";
import { useLocation } from "./LocationContext";
import fetchWeatherData from './services/roadTripApi';

const BookComponent = () => {
  const { location } = useLocation();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData(location);
        setWeatherData(data);
      } catch (error) {
        // Handle errors if needed
        console.error('Error fetching weather data in BookComponent:', error);
      }
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    console.log("Location in BookComponent", location);
    console.log("Weather Data in BookComponent", weatherData);
  }, [location, weatherData]);

  return (
    <div className="container mt-4 mb-4">
      <h2>Book Display</h2>
      {weatherData && (
        <div className="row">
          {weatherData.data.attributes.book_data.books.map((book, index) => {
          
            return (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{`${book.title}`}</h5>
                    <p>Info</p>
                    <p>Autho</p>
                    <p>Picture</p>
                    <p>Link</p>
                    <p>Summary</p>
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

export default BookComponent;
