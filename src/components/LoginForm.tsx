import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { DarkModeToggle } from './DarkModeToggle';

export const LoginForm = () => {
  const { signIn, isGoogleLoaded } = useAuth();

  return (
    <div className="min-h-screen weather-gradient-sky flex items-center justify-center p-4 relative overflow-hidden">
      <DarkModeToggle />
      
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/15 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-white/25 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="w-full max-w-md glass-card animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="text-6xl animate-pulse-slow">🌤️</div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Weather Whisper
          </CardTitle>
          <CardDescription className="text-lg">
            Your cozy weather companion for beautiful forecasts
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Sign in with Google to access your personalized weather dashboard
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <span>🔐</span>
              <span>Secure • Private • Beautiful</span>
            </div>
          </div>
          
          <Button 
            onClick={signIn}
            className="w-full h-12 text-lg font-medium hover:scale-105 transition-all duration-200"
            disabled={!isGoogleLoaded}
          >
            {isGoogleLoaded ? (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            ) : (
              'Loading Google Sign-In...'
            )}
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our beautiful weather experience
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};