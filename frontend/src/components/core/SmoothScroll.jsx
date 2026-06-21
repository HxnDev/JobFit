import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Momentum smooth-scroll for the whole window via Lenis, synced to rAF.
 * Disabled when the user prefers reduced motion. Exposes the instance on
 * window.__lenis so other components (e.g. anchor links) can drive it.
 */
const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return children;
};

export default SmoothScroll;
