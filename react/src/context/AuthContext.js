import React, { createContext, useContext, useState, useEffect } from 'react';
import { instance } from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for saved token on component mount
  useEffect(() => {
    const checkToken = async () => {
      const savedToken = localStorage.getItem('jwtToken');
      if (savedToken) {
        try {
          // Verify token with server
          const response = await instance.get('/api/auth/verify', {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          });
          if (response.data && response.data.user) {
            setToken(savedToken);
            setUser(response.data.user);
          } else {
            localStorage.removeItem('jwtToken');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('jwtToken');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  // Login function to save token and user data
  const login = async (email, password) => {
    try {
      const response = await instance.post('/api/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('jwtToken', response.data.token);
        setToken(response.data.token);
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
      return { success: false, message: 'Ошибка авторизации' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.response?.data?.message || 'Ошибка сервера' };
    }
  };

  // Logout function to clear token and user data
  const logout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    setUser(null);
  };

  // Add token to axios instance for authorized requests
  useEffect(() => {
    if (token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common['Authorization'];
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
