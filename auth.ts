import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  FC,
  useCallback,
  useEffect,
} from 'react';
import { User } from './types';

const AUTH_USER_KEY = 'dough-lab-auth-user';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // Ignore errors, default state will be used
    }
  }, []);

  const login = useCallback((newUser: User) => {
    setUser(newUser);
    try {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
    } catch (error) {
      console.error('Could not save user to localStorage', error);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_USER_KEY);
    } catch (error) {
      console.error('Could not remove user from localStorage', error);
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
