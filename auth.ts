import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
  useCallback,
  useEffect,
} from 'react';
import { User } from './types';

const AUTH_KEY = 'dough-lab-auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load user from localStorage', error);
    }
  }, []);

  const login = useCallback((userData: User) => {
    setUser(userData);
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user to localStorage', error);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (error) {
      console.error('Failed to remove user from localStorage', error);
    }
  }, []);

  const updateUser = useCallback(
    (updatedData: Partial<User>) => {
      if (user) {
        const newUser = { ...user, ...updatedData };
        setUser(newUser);
        try {
          localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
        } catch (error) {
          console.error('Failed to save updated user to localStorage', error);
        }
      }
    },
    [user],
  );

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
    updateUser,
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
