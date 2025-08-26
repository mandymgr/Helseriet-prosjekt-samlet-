import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/api';
import type { User } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (userData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  refreshToken: () => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));

          // Verify token with backend
          try {
            const response = await authService.getCurrentUser();
            if (response.success && response.data) {
              setUser(response.data);
              localStorage.setItem('user', JSON.stringify(response.data));
            } else {
              // Token invalid, clear auth
              clearAuth();
            }
          } catch (error) {
            // Token invalid or network error, clear auth
            clearAuth();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Set up token refresh interval
  useEffect(() => {
    if (token) {
      // Refresh token every 45 minutes (assuming 1h expiry)
      const refreshInterval = setInterval(async () => {
        const success = await refreshToken();
        if (!success) {
          logout();
        }
      }, 45 * 60 * 1000); // 45 minutes

      return () => clearInterval(refreshInterval);
    }
  }, [token]);

  const clearAuth = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      const response = await authService.login(email, password);
      
      if (response.success && response.data) {
        const { user: userData, token: userToken } = response.data;
        
        // Store auth data
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('auth_token', userToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        return { success: true };
      } else {
        return { success: false, error: response.message || 'Innlogging feilet' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Extract error message from API response
      let errorMessage = 'Innlogging feilet';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      const response = await authService.register(userData);
      
      if (response.success && response.data) {
        const { user: newUser, token: userToken } = response.data;
        
        // Store auth data
        setUser(newUser);
        setToken(userToken);
        localStorage.setItem('auth_token', userToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        return { success: true };
      } else {
        return { success: false, error: response.message || 'Registrering feilet' };
      }
    } catch (error: any) {
      console.error('Register error:', error);
      
      // Extract error message from API response
      let errorMessage = 'Registrering feilet';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      // Note: Backend needs to implement /auth/refresh endpoint
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.token) {
          setToken(data.data.token);
          localStorage.setItem('auth_token', data.data.token);
          
          if (data.data.user) {
            setUser(data.data.user);
            localStorage.setItem('user', JSON.stringify(data.data.user));
          }
          
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  };

  const isAuthenticated = !!user && !!token;
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    logout,
    register,
    refreshToken,
    isAuthenticated,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};