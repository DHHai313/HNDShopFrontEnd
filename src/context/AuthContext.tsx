import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  username: string;
  authorities: string[];
}

interface AuthContextType {
  user: { username: string; isAdmin: boolean } | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; isAdmin: boolean } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser({
          username: decoded.username,
          isAdmin: decoded.authorities?.includes('ADMIN') || false,
        });
      } catch (error) {
        console.error('Token decode failed:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const userData = {
        username: decoded.username,
        isAdmin: decoded.authorities?.includes('ADMIN') || false,
      };
      setUser(userData);
      navigate(userData.isAdmin ? '/admin' : '/');
    } catch (error) {
      console.error('Token decode failed:', error);
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;