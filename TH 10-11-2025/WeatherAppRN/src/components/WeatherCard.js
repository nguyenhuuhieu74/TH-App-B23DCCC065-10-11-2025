import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

const WeatherCard = ({ cityName, temperature, description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.cityName}>{cityName}</Text>
      <Text style={styles.temperature}>{Math.round(temperature)}°</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  cityName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 100,
    fontWeight: 'bold',
    color: colors.white,
  },
  description: {
    fontSize: 28,
    color: colors.white,
    marginTop: 10,
  },
});

export default WeatherCard;