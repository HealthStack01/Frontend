import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import AppRoutes from './routes/routes';
import { GlobalStyle } from './styles/global';
import { darkTheme, lightTheme } from './styles/theme';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ObjectProvider } from './context/context';

function App() {
  useEffect(() => {
    gsap.to('body', 0, { css: { visibility: 'visible' } });
  });

  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  console.log(themeToggler);

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <ObjectProvider>
          <GlobalStyle />
          <AnimatePresence initial={true} exitBeforeEnter>
            <AppRoutes />
          </AnimatePresence>
        </ObjectProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
