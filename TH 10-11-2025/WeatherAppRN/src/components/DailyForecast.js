import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { getDayOfWeek } from '../utils/helpers';

const DailyForecast = ({ dailyData }) => {
  const getDayLabel = (index, timestamp) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    return getDayOfWeek(timestamp);
  };

  return (
    <View style={styles.container}>
      {dailyData.slice(0, 5).map((day, index) => (
        <View key={index} style={styles.dayRow}>
          <Text style={styles.dayText}>
            {getDayLabel(index, day.dt)}
          </Text>
          <Ionicons name="partly-sunny" size={20} color={colors.white} />
          <Text style={styles.minTemp}>{Math.round(day.temp.min)}°</Text>
          <Text style={styles.maxTemp}>{Math.round(day.temp.max)}°</Text>
        </View>
      ))}
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
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dayText: {
    flex: 1,
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  minTemp: {
    color: colors.lightGray,
    fontSize: 18,
    marginLeft: 15,
    width: 40,
    textAlign: 'right',
  },
  maxTemp: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    width: 40,
    textAlign: 'right',
  },
});

export default DailyForecast;