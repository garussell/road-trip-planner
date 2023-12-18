import { useState } from 'react';
import { useAuth } from '../components/Auth/AuthContext';
import axios from 'axios';

const useMovieData = () => {
  const { apiKey } = useAuth();
  const [movieData, setMovieData] = useState(null);

const fetchMovieData = async () => {
      
      console.log('fetchMovieData', apiKey);
      
      try {
        const response = await axios.get(
          'http://localhost:3000/api/v0/movies',
            {
              api_key: apiKey,
            },
          );
          
        console.log('Movie API response:', response.data);
  
        setMovieData(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        throw error;
      }
    };

  return { movieData, fetchMovieData };
};

export default useMovieData;

