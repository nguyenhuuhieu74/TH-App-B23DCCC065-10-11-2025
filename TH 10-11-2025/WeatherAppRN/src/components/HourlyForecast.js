import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { getFormattedHour } from '../utils/helpers';

const HourlyForecast = ({ hourlyData }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hourlyData.slice(0, 24).map((hour, index) => (
          <View key={index} style={styles.hourItem}>
            <Text style={styles.timeText}>
              {getFormattedHour(hour.dt, index === 0)}
            </Text>
            <Ionicons name="partly-sunny" size={30} color={colors.white} />
            <Text style={styles.tempText}>{Math.round(hour.temp)}°</Text>
            <Text style={styles.windText}>
              {(hour.wind_speed * 3.6).toFixed(1)} km/h
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  },
  hourItem: {
    alignItems: 'center',
    marginRight: 20,
    paddingHorizontal: 10,
  },
  timeText: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 5,
  },
  tempText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  windText: {
    color: colors.lightGray,
    fontSize: 14,
    marginTop: 3,
  },
});

export default HourlyForecast;