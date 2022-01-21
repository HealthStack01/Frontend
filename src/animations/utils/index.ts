export const containerVariants = {
  hidden: {
    opacity: 0,
    x: '40vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      delay: 0.5,
      stiffness: 40,
      mass: 2.5,
    },
  },
  exit: {
    x: '-100vh',
    transition: { ease: 'easeInOut' },
  },
};

export const backgroundVariants = {
  hidden: {
    opacity: 0,
    x: '-100vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ease: 'easeInOut', duration: 2 },
  },
  exit: {
    x: '100vh',
    transition: { ease: 'easeInOut' },
  },
};
