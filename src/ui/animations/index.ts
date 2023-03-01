// eslint-disable-next-line import/no-named-as-default
import gsap from 'gsap';

// General timeline
const t1 = gsap.timeline();

// Preloader Animation
export const preLoaderAnimation = () => {
  t1.to('body', {
    duration: 1,
    css: { overflowY: 'hidden' },
    ease: 'power3.inOut',
  })
    .to('landing', {
      duration: 0.05,
      css: { overflowY: 'hidden', height: '100vh' },
      ease: 'Power3.easeOut',
    })
    .to('.texts-container', {
      duration: 0,
      opacity: 1,
      ease: 'Power3.easeOut',
    })
    .from('.texts-container span', {
      duration: 1.5,
      delay: 0.5,
      opacity: 0,
      x: 70,
      skewX: 10,
      stagger: 0.4,
      ease: 'Power3.easeOut',
    })

    .to('.texts-container span', {
      opacity: 0,
      stagger: 0.4,
      ease: 'Power3.easeOut',
    })
    .to('.landing', {
      duration: 0.05,
      css: { overflowY: 'hidden', height: '100vh' },
      ease: 'Power3.easeOut',
    })
    .to('body', {
      duration: 0.1,
      css: { overflowY: 'auto' },
      ease: 'power3.inOut',
    })
    .to('.preloader', {
      duration: 0.8,
      css: { display: 'none' },
      ease: 'power3.inOut',
    });
};
