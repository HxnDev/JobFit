import { useEffect, useRef } from 'react';

/**
 * Magnetic dual-layer cursor: a crisp inner dot that tracks the pointer 1:1
 * and a softer ring that trails with easing and swells over interactive
 * targets. Pure DOM + rAF for zero React re-renders. Hidden on touch.
 */
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, .jf-interactive, [data-cursor="hover"]';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let visible = false;
    let frame;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(animate);
    };

    const onOver = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE)) ring.classList.add('is-hover');
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE)) ring.classList.remove('is-hover');
    };
    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');
    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      visible = false;
    };

    dot.style.opacity = '0';
    ring.style.opacity = '0';
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mouseout', onOut, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="jf-cursor-dot" />
      <div ref={ringRef} className="jf-cursor-ring" />
    </>
  );
};

export default CustomCursor;
