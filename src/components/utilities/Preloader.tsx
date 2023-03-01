import React, { useEffect } from 'react';

import { preLoaderAnimation } from '../../ui/animations';
import { Container } from '../../ui/styled/global';

function Preloader() {
  useEffect(() => {
    preLoaderAnimation();
  }, []);
  return (
    <Container className="center preloader">
      <div className="texts-container text-center">
        <h2>Welcome</h2>
        <span>Have a fun working day!</span>
      </div>
    </Container>
  );
}

export default Preloader;
