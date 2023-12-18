import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../Auth/AuthContext';
import useMovieData from '../../services/movieService';

const MovieComponent = () => {
  const { apiKey } = useAuth();
  const [query, setQuery] = useState('');
  const { movieData, fetchMovieData } = useMovieData();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetchMovieData(query);
    } catch (error) {
      console.error('Error handling form submission: movieComponent', error);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      await fetchMovieData();
      setQuery(''); // Clear the query after fetching data
    } catch (error) {
      console.error('Error fetching movie data: movieComponent', error);
    }
  }, [fetchMovieData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log('movieData', movieData);

  return (
    <div className="container">
      {apiKey && (
        <div>
          <form onSubmit={handleFormSubmit}>
            <label>
              <button className="btn btn-primary mt-2" type="submit">
                Top 20 Movies
              </button>
            </label>
          </form>

          <br />

          {movieData && (
            <div className="row">
              {movieData.data.map((movie, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.attributes.poster_path}`}
                        alt={`${movie.attributes.title} Poster`}
                        style={{ width: '300px', height: '300px', marginRight: '20px' }}
                        className="img-thumbnail"
                      />
                      <h5 className="card-title">{movie.attributes.title}</h5>
                      <h6 className="card-title">Release Date:{movie.attributes.release_date}</h6>
                      <p className="card-text">Overview: {movie.attributes.overview}</p>
                      <p className="card-text">Genres: {movie.attributes.genres}</p>
                      <p className="card-text">Vote Average {movie.attributes.vote_average}</p>
                      <p className="card-text">Vote Count {movie.attributes.vote_count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieComponent;
