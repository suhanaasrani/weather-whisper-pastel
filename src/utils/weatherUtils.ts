export const getWeatherEmoji = (weatherMain: string, icon: string): string => {
  const isDay = icon.includes('d');
  
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return isDay ? '☀️' : '🌙';
    case 'clouds':
      return '☁️';
    case 'rain':
      return '🌧️';
    case 'drizzle':
      return '🌦️';
    case 'thunderstorm':
      return '⛈️';
    case 'snow':
      return '❄️';
    case 'mist':
    case 'fog':
      return '🌫️';
    case 'haze':
      return '🌤️';
    default:
      return isDay ? '🌤️' : '🌙';
  }
};

export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(degrees / 22.5) % 16];
};

export const generateFunFact = (weather: string, temp: number): string => {
  const facts = [
    `Today's ${weather.toLowerCase()} weather is perfect for cozy indoor activities ☁️📖`,
    `The temperature of ${temp}°C is ideal for a refreshing walk 🚶‍♀️🌸`,
    `This ${weather.toLowerCase()} day reminds us that every weather brings its own beauty 🌈✨`,
    `Fun fact: Weather like this occurs only ${Math.floor(Math.random() * 15 + 5)}% of the year! 🎯`,
    `Perfect ${weather.toLowerCase()} weather for making memories and sipping hot cocoa ☕️💙`,
    `Nature's way of saying 'slow down and enjoy the moment' 🌿🧘‍♀️`,
    `This weather pattern creates the most stunning cloud formations 🌤️🎨`,
    `Today's atmospheric conditions are perfect for stargazing tonight 🌟🔭`
  ];
  
  return facts[Math.floor(Math.random() * facts.length)];
};

export const getWeatherGradient = (weatherMain: string): string => {
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return 'weather-gradient-sunset';
    case 'rain':
    case 'drizzle':
    case 'thunderstorm':
      return 'weather-gradient-rain';
    default:
      return 'weather-gradient-sky';
  }
};

export const getAirQualityInfo = (humidity: number, windSpeed: number): { index: number; level: string; description: string } => {
  // Simulate AQI based on humidity and wind (in real app, use actual air quality API)
  const baseAqi = Math.round(50 + (humidity * 0.3) - (windSpeed * 5));
  const aqi = Math.max(10, Math.min(200, baseAqi));
  
  if (aqi <= 50) {
    return {
      index: aqi,
      level: 'Good',
      description: 'Air quality is satisfactory. Fresh air ideal for outdoor activities and open windows.'
    };
  } else if (aqi <= 100) {
    return {
      index: aqi,
      level: 'Moderate',
      description: 'Air quality is acceptable. Sensitive individuals may experience mild discomfort outdoors.'
    };
  } else if (aqi <= 150) {
    return {
      index: aqi,
      level: 'Unhealthy',
      description: 'Sensitive groups may experience health effects. Consider reducing prolonged outdoor exertion.'
    };
  } else {
    return {
      index: aqi,
      level: 'Very Unhealthy',
      description: 'Health warnings of emergency conditions. Everyone may experience health effects outdoors.'
    };
  }
};

// API key placeholders - user will replace these
export const API_KEYS = {
  OPENWEATHER: 'YOUR_OPENWEATHER_API_KEY',
  GOOGLE_CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID'
};