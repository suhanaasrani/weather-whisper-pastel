import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWeatherData } from '../hooks/useWeatherData';
import { useAuth } from '../hooks/useAuth';
import { WeatherChart } from './WeatherChart';
import { HazardAlerts } from './HazardAlerts';
import { FunFacts } from './FunFacts';
import { DarkModeToggle } from './DarkModeToggle';
import { getWeatherEmoji, formatTime, formatDate, getWeatherGradient } from '../utils/weatherUtils';
import { toast } from '@/hooks/use-toast';

export const WeatherDashboard = () => {
  const { user, signOut } = useAuth();
  const { weatherData, historicalData, loading, error, fetchWeatherData } = useWeatherData();
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('');

  const handleSearch = async () => {
    if (!searchCity.trim()) {
      toast({
        title: "Please enter a city name",
        description: "Enter a valid city name to get weather information",
        variant: "destructive"
      });
      return;
    }
    
    setCity(searchCity);
    await fetchWeatherData(searchCity.trim());
    
    if (error) {
      toast({
        title: "Error fetching weather",
        description: error,
        variant: "destructive"
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`min-h-screen ${weatherData ? getWeatherGradient(weatherData.current.weather[0]?.main || 'clear') : 'weather-gradient-sky'}`}>
      <DarkModeToggle />
      
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">🌤️</div>
                <div>
                  <CardTitle className="text-xl">Weather Whisper</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Welcome back, {user?.name}! 👋
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <img 
                  src={user?.picture} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full"
                />
                <Button 
                  onClick={signOut}
                  variant="outline"
                  size="sm"
                  className="glass-card border-0"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Search */}
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter city name (e.g., London, New York, Tokyo)"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={loading}
              />
              <Button 
                onClick={handleSearch}
                disabled={loading || !searchCity.trim()}
              >
                {loading ? '🔄' : '🔍'} Search
              </Button>
            </div>
            
            {city && (
              <div className="mt-2 text-sm text-muted-foreground">
                📍 Showing weather for: <span className="font-medium">{city}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {error && (
          <Card className="glass-card border-destructive">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-destructive">
                <span>⚠️</span>
                <span>Error: {error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {loading && (
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="text-4xl animate-pulse-slow">🌤️</div>
                <div className="text-lg font-medium">Fetching weather data...</div>
                <div className="text-sm text-muted-foreground">
                  Getting the latest forecast for {searchCity}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {weatherData && (
          <div className="space-y-6 animate-fade-in">
            {/* Current Weather */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>📍</span>
                    <span>{weatherData.location.name}, {weatherData.location.country}</span>
                  </div>
                  <Badge variant="secondary">
                    {new Date().toLocaleDateString([], { 
                      weekday: 'long',
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Main weather display */}
                  <div className="text-center space-y-4">
                    <div className="text-8xl animate-float">
                      {getWeatherEmoji(weatherData.current.weather[0].main, weatherData.current.weather[0].icon)}
                    </div>
                    <div>
                      <div className="text-5xl font-bold text-primary">
                        {Math.round(weatherData.current.temp)}°C
                      </div>
                      <div className="text-lg text-muted-foreground">
                        Feels like {Math.round(weatherData.current.feels_like)}°C
                      </div>
                      <div className="text-xl capitalize mt-2">
                        {weatherData.current.weather[0].description}
                      </div>
                    </div>
                  </div>

                  {/* Weather details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span>💧</span>
                        <span className="text-sm text-muted-foreground">Humidity</span>
                      </div>
                      <div className="text-2xl font-bold">{weatherData.current.humidity}%</div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span>💨</span>
                        <span className="text-sm text-muted-foreground">Wind</span>
                      </div>
                      <div className="text-2xl font-bold">{weatherData.current.wind_speed.toFixed(1)} m/s</div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span>🌅</span>
                        <span className="text-sm text-muted-foreground">Sunrise</span>
                      </div>
                      <div className="text-lg font-bold">{formatTime(weatherData.current.sunrise)}</div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span>🌇</span>
                        <span className="text-sm text-muted-foreground">Sunset</span>
                      </div>
                      <div className="text-lg font-bold">{formatTime(weatherData.current.sunset)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hourly & Daily Forecast */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>⏰</span>
                  <span>Hourly Forecast</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {weatherData.hourly.slice(0, 12).map((hour, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 text-center p-3 bg-muted/30 rounded-lg min-w-[100px] animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-sm text-muted-foreground mb-2">
                        {formatTime(hour.dt)}
                      </div>
                      <div className="text-2xl mb-2">
                        {getWeatherEmoji(hour.weather[0].main, hour.weather[0].icon)}
                      </div>
                      <div className="font-bold">{Math.round(hour.temp)}°</div>
                      <div className="text-xs text-blue-500 mt-1">
                        {Math.round(hour.pop * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>📅</span>
                  <span>7-Day Forecast</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weatherData.daily.map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">
                          {getWeatherEmoji(day.weather[0].main, day.weather[0].icon)}
                        </div>
                        <div>
                          <div className="font-medium">{formatDate(day.dt)}</div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {day.weather[0].description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
                        </div>
                        <div className="text-sm text-blue-500">
                          {Math.round(day.pop * 100)}% rain
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabbed Sections */}
            <Tabs defaultValue="alerts" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 glass-card">
                <TabsTrigger value="alerts">⚠️ Alerts</TabsTrigger>
                <TabsTrigger value="charts">📊 Charts</TabsTrigger>
                <TabsTrigger value="facts">🎉 Fun Facts</TabsTrigger>
              </TabsList>

              <TabsContent value="alerts">
                <HazardAlerts alerts={weatherData.alerts || []} />
              </TabsContent>

              <TabsContent value="charts">
                <WeatherChart weatherData={weatherData} />
              </TabsContent>

              <TabsContent value="facts">
                <FunFacts weatherData={weatherData} historicalData={historicalData} />
              </TabsContent>
            </Tabs>

            {/* Footer */}
            <Card className="glass-card text-center">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>🌤️ Weather data provided by OpenWeatherMap</p>
                  <p>💙 Built with love for beautiful weather experiences</p>
                  <Separator className="my-2" />
                  <p>Last updated: {new Date().toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!weatherData && !loading && !error && (
          <Card className="glass-card">
            <CardContent className="p-8 text-center space-y-4">
              <div className="text-6xl animate-float">🌍</div>
              <div className="text-xl font-medium">Ready to explore the weather?</div>
              <div className="text-muted-foreground">
                Search for any city to see its beautiful forecast, alerts, and fun weather facts!
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};