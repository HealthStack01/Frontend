import 'react-toastify/dist/ReactToastify.css';

import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import { ObjectProvider, UserProvider } from './context/context';
import AppRoutes from './pages/routes';
import { GlobalStyle } from './ui/styled/global';
import { darkTheme, lightTheme } from './ui/styled/theme';

function App() {
  useEffect(() => {
    gsap.to('body', 0, { css: { visibility: 'visible' } });
  }, []);

  const [theme] = useState('light');
  //TODO:  Handle  with  appropriate button
  // const themeToggler = () => {
  //   theme === 'light' ? setTheme('dark') : setTheme('light');
  // };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <ObjectProvider>
          <UserProvider>
            <GlobalStyle />
            <AnimatePresence initial exitBeforeEnter>
              <AppRoutes />
            </AnimatePresence>
          </UserProvider>
        </ObjectProvider>
        <ToastContainer limit={1} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
