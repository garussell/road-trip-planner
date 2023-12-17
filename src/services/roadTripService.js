// useRoadTripData.js
import { useState } from 'react';
import { useAuth } from '../components/Auth/AuthContext';
import axios from 'axios';

const useRoadTripData = () => {
  const { apiKey } = useAuth();
  const [roadTripData, setRoadTripData] = useState(null);

  const fetchRoadTripData = async (origin, destination) => {

    console.log('fetchRoadTripData', origin, destination, apiKey);
    
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v0/road_trip',
          {
            origin: origin,
            destination: destination,
            api_key: apiKey,
          },
        );
        
      console.log('Road trip API response:', response.data);

      setRoadTripData(response.data);
    } catch (error) {
      console.error('Error fetching road trip data:', error);
      throw error;
    }
  };

  return { roadTripData, fetchRoadTripData };
};

export default useRoadTripData;
