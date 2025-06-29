// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
interface JwtPayload {
  sub: string; 
  authorities: string[];
  iat?: number;
  exp?: number;
}

interface User {
  username: string;
  isAdmin: boolean;
  authorities: string[];
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const userData: User = {
          username: decoded.sub, 
          isAdmin: decoded.authorities?.includes('ADMIN') || false,
          authorities: decoded.authorities || [],
        };
        setUser(userData);
      } catch (error) {
        console.error('Giải mã token thất bại:', error);
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const userData: User = {
        username: decoded.sub, 
        isAdmin: decoded.authorities?.includes('ADMIN') || false,
        authorities: decoded.authorities || [],
      };
      setUser(userData);
      navigate(userData.isAdmin ? '/admin' : '/');
    } catch (error) {
      console.error('Giải mã token thất bại:', error);
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
