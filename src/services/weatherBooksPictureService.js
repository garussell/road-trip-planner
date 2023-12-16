// weatherBooksPictureService.js
import axios from 'axios';

const fetchWeatherData = async (location) => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/data', {
      params: {
        location: location,
      },
    });

    console.log('API response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export default fetchWeatherData;
