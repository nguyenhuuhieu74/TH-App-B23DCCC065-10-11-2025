import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import DailyForecast from '../components/DailyForecast';
import HourlyForecast from '../components/HourlyForecast';
import WeatherCard from '../components/WeatherCard';
import WeatherDetails from '../components/WeatherDetails';
import { colors } from '../constants/colors';
import { weatherAPI } from '../services/weatherAPI';

const GPSScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocationAndFetchWeather();
  }, []);

  const getLocationAndFetchWeather = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required');
        fetchWeatherByCity('Hanoi');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const data = await weatherAPI.getWeatherByCoords(latitude, longitude);
      setWeatherData(data);

      const city = await weatherAPI.getCityFromCoords(latitude, longitude);
      setCityName(city);

      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Could not get location');
      fetchWeatherByCity('Hanoi');
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      const data = await weatherAPI.getWeatherByCity(city);
      setWeatherData(data);
      setCityName(city);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !weatherData) {
    return (
      <LinearGradient colors={['#5374E7', '#77A7FF']} style={styles.container}>
        <ActivityIndicator size="large" color={colors.white} style={styles.loader} />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#5374E7', '#77A7FF']} style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="location" size={30} color={colors.white} />
        <Text style={styles.gpsText}>Your Location</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <WeatherCard
          cityName={cityName}
          temperature={weatherData.current.temp}
          description={weatherData.current.weather[0].description}
        />

        <View style={styles.content}>
          <DailyForecast dailyData={weatherData.daily} />
          <HourlyForecast hourlyData={weatherData.hourly} />
          <WeatherDetails current={weatherData.current} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  gpsText: {
    color: colors.white,
    fontSize: 20,
    marginLeft: 10,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  loader: {
    marginTop: 100,
  },
  loadingText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default GPSScreen;