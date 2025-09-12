export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
    sunrise: number;
    sunset: number;
    uvi: number;
  };
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  alerts?: WeatherAlert[];
}

export interface HourlyWeather {
  dt: number;
  temp: number;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  pop: number;
}

export interface DailyWeather {
  dt: number;
  temp: {
    day: number;
    night: number;
    min: number;
    max: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  pop: number;
  humidity: number;
  wind_speed: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherAlert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export interface HistoricalWeather {
  date: string;
  temp: number;
  description: string;
  year: number;
}