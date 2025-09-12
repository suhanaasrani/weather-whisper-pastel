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

// API key placeholders - user will replace these
export const API_KEYS = {
  OPENWEATHER: 'YOUR_OPENWEATHER_API_KEY',
  GOOGLE_CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID'
};