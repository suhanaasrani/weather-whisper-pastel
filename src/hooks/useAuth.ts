import { useState, useEffect } from 'react';
import { GoogleUser } from '../types/weather';
import { API_KEYS } from '../utils/weatherUtils';

declare global {
  interface Window {
    google: any;
    gapi: any;
  }
}

export const useAuth = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  useEffect(() => {
    // Load Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => {
      setIsGoogleLoaded(true);
      initializeGoogleSignIn();
    };
    document.head.appendChild(script);

    // Check if user is already logged in
    const savedUser = localStorage.getItem('weatherAppUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeGoogleSignIn = () => {
    if (window.google && API_KEYS.GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID') {
      window.google.accounts.id.initialize({
        client_id: API_KEYS.GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
    }
  };

  const handleCredentialResponse = (response: any) => {
    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      const userData: GoogleUser = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      };
      
      setUser(userData);
      localStorage.setItem('weatherAppUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Error parsing JWT:', error);
    }
  };

  const signIn = () => {
    if (window.google && API_KEYS.GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID') {
      window.google.accounts.id.prompt();
    } else {
      // Fallback for demo purposes when API key is not set
      const demoUser: GoogleUser = {
        id: 'demo_user',
        name: 'Demo User',
        email: 'demo@example.com',
        picture: 'https://via.placeholder.com/40'
      };
      setUser(demoUser);
      localStorage.setItem('weatherAppUser', JSON.stringify(demoUser));
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('weatherAppUser');
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  return {
    user,
    isLoading,
    isGoogleLoaded,
    signIn,
    signOut,
  };
};