import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { getWindDirection, getFormattedTime } from '../utils/helpers';

const WeatherDetails = ({ current }) => {
  const DetailBox = ({ icon, label, value }) => (
    <View style={styles.detailBox}>
      <Ionicons name={icon} size={35} color={colors.white} />
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <DetailBox
          icon="water"
          label="Độ ẩm"
          value={`${current.humidity}%`}
        />
        <DetailBox
          icon="sunny"
          label="UV"
          value={Math.round(current.uvi).toString()}
        />
      </View>
      
      <View style={styles.row}>
        <DetailBox
          icon="sunny-outline"
          label="Hoàng hôn"
          value={getFormattedTime(current.sunset)}
        />
        <DetailBox
          icon="speedometer"
          label="Áp suất"
          value={`${current.pressure} mbar`}
        />
      </View>
      
      <View style={styles.row}>
        <DetailBox
          icon="thermometer"
          label="Cảm giác như"
          value={`${Math.round(current.feels_like)}°`}
        />
        <DetailBox
          icon="navigate"
          label={getWindDirection(current.wind_deg)}
          value={`${(current.wind_speed * 3.6).toFixed(1)} km/h`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailBox: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  detailLabel: {
    color: colors.white,
    fontSize: 16,
    marginTop: 5,
  },
  detailValue: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 3,
  },
});

export default WeatherDetails;