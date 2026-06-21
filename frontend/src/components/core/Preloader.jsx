import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Cinematic boot sequence: an animated mark, a counting progress meter, and
 * a curtain that lifts to reveal the app. Shows once per page load.
 */
const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setProgress(100);
      const t = setTimeout(() => setDone(true), 200);
      return () => clearTimeout(t);
    }

    let raf;
    const start = performance.now();
    const total = 1700;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / total);
      // ease-out so the counter decelerates near 100
      const eased = 1 - Math.pow(1 - p, 2.2);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(800px 600px at 50% 40%, #0c0e1c, #06070e)',
          }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ position: 'relative', width: 120, height: 120 }}
          >
            <svg viewBox="0 0 120 120" width="120" height="120">
              <defs>
                <linearGradient id="jf-pre-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#9D8CFF" />
                  <stop offset="100%" stopColor="#1FE0A8" />
                </linearGradient>
              </defs>
              <motion.circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#jf-pre-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="327"
                initial={{ strokeDashoffset: 327, rotate: -90 }}
                animate={{ strokeDashoffset: 327 - (327 * progress) / 100 }}
                transition={{ ease: 'linear' }}
                style={{ transformOrigin: '60px 60px', rotate: '-90deg' }}
              />
            </svg>
            <div
              className="jf-display"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              JF
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="jf-display"
            style={{ marginTop: 28, letterSpacing: '0.4em', fontSize: 13, color: '#a3a8c3' }}
          >
            CALIBRATING YOUR FIT · {progress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
