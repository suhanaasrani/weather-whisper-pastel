import { useAuth } from '../hooks/useAuth';
import { LoginForm } from './LoginForm';
import { WeatherDashboard } from './WeatherDashboard';
import { Toaster } from '@/components/ui/toaster';

export const WeatherApp = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen weather-gradient-sky flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-pulse-slow">🌤️</div>
          <div className="text-xl font-medium">Loading Weather Whisper...</div>
          <div className="text-muted-foreground">Preparing your beautiful weather experience</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {user ? <WeatherDashboard /> : <LoginForm />}
      <Toaster />
    </>
  );
};