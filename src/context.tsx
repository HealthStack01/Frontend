import React, { useState, createContext, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface UserProps {
  name?: string;
  email?: string;
  age?: number;
  DOB?: string;
  password: string;
}

interface AppContextProps {
  theme?: string;
  themeToggler?: Function;
  isLoggedIn: boolean;
  user?: UserProps;
  loading: boolean;
  error?: any;
  login?: (email: string, password: string) => void;
  signUp?: (email: string, name: string, password: string) => void;
  logout?: () => void;
}

const contextDefaultValues: AppContextProps = {
  theme: 'light',
  themeToggler: () => {},
  isLoggedIn: false,
  user: { name: '', email: '', age: 0, DOB: '', password: '' },
  loading: true,
  error: null,
  login: () => {},
  signUp: () => {},
  logout: () => {},
};

export const AppContext = createContext<AppContextProps>(contextDefaultValues);

const AppProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  const [isLogged, setIsLogged] = useState<boolean>(
    contextDefaultValues.isLoggedIn
  );
  const [loading, setLoading] = useState<boolean>(contextDefaultValues.loading);
  const [error, setError] = useState<any>(contextDefaultValues.error);

  const login = () => setIsLogged(!isLogged);

  let isLoggedIn = isLogged;

  const memoedValue = useMemo(
    () => ({ theme, loading, themeToggler, isLoggedIn, login }),
    [theme, isLoggedIn, loading]
  );

  return (
    <AppContext.Provider value={memoedValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
