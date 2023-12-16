// roadTripService.js
import axios from 'axios';

const fetchRoadTripData = async (origin, destination, api_key) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v0/road_trip', {
      body: {
        origin: origin,
        destination: destination,
        api_key: api_key,
      },
    });

    console.log('API response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching road trip data:', error);
    throw error;
  }
};

export default fetchRoadTripData;