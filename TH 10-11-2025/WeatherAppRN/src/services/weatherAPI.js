import axios from 'axios';

const API_KEY = '0a0b503927090bc59cd3de9f86621ecb'; 
const BASE_URL = 'https://api.openweathermap.org';

export const weatherAPI = {
  async getWeatherByCity(cityName) {
    try {
      const geoResponse = await axios.get(
        `${BASE_URL}/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      
      if (geoResponse.data.length === 0) {
        throw new Error('City not found');
      }
      
      const { lat, lon } = geoResponse.data[0];
      
      return await this.getWeatherByCoords(lat, lon);
    } catch (error) {
      throw error;
    }
  },

  async getWeatherByCoords(lat, lon) {
    try {
      const response = await axios.get(
        `${BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&exclude=minutely,alerts`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getCityFromCoords(lat, lon) {
    try {
      const response = await axios.get(
        `${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );
      return response.data[0]?.name || 'Unknown';
    } catch (error) {
      return 'Unknown';
    }
  },
};