import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import AppProvider from './context';
import AppRoutes from './routes/routes';
import { GlobalStyle } from './styles/global';
import { darkTheme, lightTheme } from './styles/theme';
import { Scrollbar } from 'smooth-scrollbar-react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router';
import gsap from 'gsap';
import { ObjectProvider } from './context/context';

function App() {
  const location = useLocation();
  useEffect(() => {
    gsap.to('body', 0, { css: { visibility: 'visible' } });
  });

  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <ObjectProvider>
          <AppProvider>
            <GlobalStyle />
            <AnimatePresence initial={true} exitBeforeEnter>
              <AppRoutes />
            </AnimatePresence>
          </AppProvider>
        </ObjectProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
