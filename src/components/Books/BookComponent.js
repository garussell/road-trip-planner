// BookComponent.js
import React, { useEffect, useState } from "react";
import { useLocation } from "../Location/LocationContext";
import fetchWeatherData from '../../services/weatherBooksPictureService';

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
  }, [location, weatherData]);

  return (
    <div className="container mt-4 mb-4">
      <h2>Books and Maps</h2>
      {weatherData && (
        <div className="row">
          {weatherData.data.attributes.book_data.books.map((book, index) => {
          
            return (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Title: {`${book.title}`}</h5>
                    <p>Published: {Array.isArray(book.publish_year) ? book.publish_year.slice(-1)[0] : book.publish_year}</p>
                    <p>Author: {book.author}</p>
                    <p>Publisher: {book.publisher}</p>
                    <p>
                      {book.preview ? (
                        <>
                          <img src={book.preview} alt= "No Preview" />
                          <br />
                        </>
                      ) : (
                        <img src="/moon.png" alt="" />
                      )}
                      Link: <a href={book.preview} target="_blank" rel="noopener noreferrer">Preview</a>
                    </p>
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
