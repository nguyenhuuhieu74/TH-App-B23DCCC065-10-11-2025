export const getFormattedHour = (timestamp, isFirst = false) => {
  if (isFirst) return 'Now';
  
  const date = new Date(timestamp * 1000);
  const hour = date.getHours();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  
  return `${hour12} ${ampm}`;
};

export const getDayOfWeek = (timestamp) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(timestamp * 1000);
  return days[date.getDay()];
};

export const getFormattedTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const getWindDirection = (degrees) => {
  const directions = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export const getWeatherIcon = (iconCode) => {
  const iconMap = {
    '01d': 'day-sunny',
    '01n': 'night-clear',
    '02d': 'day-cloudy',
    '02n': 'night-alt-cloudy',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloudy',
    '04n': 'cloudy',
    '09d': 'showers',
    '09n': 'showers',
    '10d': 'day-rain',
    '10n': 'night-alt-rain',
    '11d': 'thunderstorm',
    '11n': 'thunderstorm',
    '13d': 'snow',
    '13n': 'snow',
    '50d': 'fog',
    '50n': 'fog',
  };
  return iconMap[iconCode] || 'day-sunny';
};