import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import DailyForecast from '../components/DailyForecast';
import HourlyForecast from '../components/HourlyForecast';
import WeatherCard from '../components/WeatherCard';
import WeatherDetails from '../components/WeatherDetails';
import { colors } from '../constants/colors';
import { weatherAPI } from '../services/weatherAPI';

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('Hanoi');
  const [searchInput, setSearchInput] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather('Hanoi');
  }, []);

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      const data = await weatherAPI.getWeatherByCity(city);
      setWeatherData(data);
      setCityName(city);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      fetchWeather(searchInput);
      setShowSearch(false);
      setSearchInput('');
    }
  };

  if (loading || !weatherData) {
    return (
      <LinearGradient colors={['#5374E7', '#77A7FF']} style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#5374E7', '#77A7FF']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
          <Ionicons name="search" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>

      {showSearch && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter city name"
            placeholderTextColor={colors.lightGray}
            value={searchInput}
            onChangeText={setSearchInput}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      )}

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
    justifyContent: 'flex-end',
    padding: 20,
    paddingTop: 50,
  },
  searchContainer: {
    backgroundColor: colors.background,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: 'transparent',
    color: colors.white,
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  },
  searchButton: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  searchButtonText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  loadingText: {
    color: colors.white,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 100,
  },
});

export default HomeScreen;