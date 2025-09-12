import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '../types/weather';
import { formatTime } from '../utils/weatherUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface WeatherChartProps {
  weatherData: WeatherData;
}

export const WeatherChart = ({ weatherData }: WeatherChartProps) => {
  const hourlyData = weatherData.hourly.slice(0, 12);
  const dailyData = weatherData.daily.slice(0, 7);

  const hourlyChartData = {
    labels: hourlyData.map(hour => formatTime(hour.dt)),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: hourlyData.map(hour => Math.round(hour.temp * 10) / 10),
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsla(var(--primary), 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'hsl(var(--primary))',
        pointBorderColor: 'hsl(var(--primary-foreground))',
        pointBorderWidth: 2,
      },
      {
        label: 'Rain Probability (%)',
        data: hourlyData.map(hour => Math.round(hour.pop * 100 * 10) / 10),
        borderColor: 'hsl(var(--weather-rainy))',
        backgroundColor: 'hsla(var(--weather-rainy), 0.1)',
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: 'hsl(var(--weather-rainy))',
        yAxisID: 'y1',
      }
    ]
  };

  const dailyChartData = {
    labels: dailyData.map(day => {
      const date = new Date(day.dt * 1000);
      return date.toLocaleDateString([], { weekday: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Max Temp (°C)',
        data: dailyData.map(day => Math.round(day.temp.max * 10) / 10),
        borderColor: 'hsl(var(--weather-sunny))',
        backgroundColor: 'hsla(var(--weather-sunny), 0.2)',
        fill: '+1',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Min Temp (°C)',
        data: dailyData.map(day => Math.round(day.temp.min * 10) / 10),
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsla(var(--primary), 0.2)',
        fill: 'origin',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'system-ui, -apple-system, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'hsl(var(--popover))',
        titleColor: 'hsl(var(--popover-foreground))',
        bodyColor: 'hsl(var(--popover-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
      }
    },
    scales: {
      x: {
        grid: {
          color: 'hsl(var(--border))',
          drawBorder: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            size: 11
          }
        }
      },
      y: {
        position: 'left' as const,
        grid: {
          color: 'hsl(var(--border))',
          drawBorder: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            size: 11
          },
          callback: (value: any) => `${value}°C`
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            size: 11
          },
          callback: (value: any) => `${value}%`
        }
      }
    }
  };

  const dailyOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y1: undefined
    }
  };

  // Calculate statistics
  const avgTemp = Math.round(
    (dailyData.reduce((sum, day) => sum + day.temp.day, 0) / dailyData.length) * 10
  ) / 10;
  
  const minTemp = Math.round(
    Math.min(...dailyData.map(day => day.temp.min)) * 10
  ) / 10;
  
  const maxTemp = Math.round(
    Math.max(...dailyData.map(day => day.temp.max)) * 10
  ) / 10;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{avgTemp}°C</div>
            <div className="text-sm text-muted-foreground">7-Day Average</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-weather-sunny">{maxTemp}°C</div>
            <div className="text-sm text-muted-foreground">Week's High</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{minTemp}°C</div>
            <div className="text-sm text-muted-foreground">Week's Low</div>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Chart */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📊</span>
            <span>12-Hour Forecast</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Line data={hourlyChartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Daily Chart */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📈</span>
            <span>7-Day Temperature Range</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Line data={dailyChartData} options={dailyOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};