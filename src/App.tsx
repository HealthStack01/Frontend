import 'react-toastify/dist/ReactToastify.css';

import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import { ObjectProvider, UserProvider } from './context/context';
import AppRoutes from './routes/routes';
import { GlobalStyle } from './styles/global';
import { darkTheme, lightTheme } from './styles/theme';

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
      <ObjectProvider>
        <UserProvider>
          <GlobalStyle />
          <AnimatePresence initial exitBeforeEnter>
            <AppRoutes />
          </AnimatePresence>
        </UserProvider>
      </ObjectProvider>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
