import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Animated circular match meter. Sweeps the arc and counts the number up
 * when scrolled into view. Hue follows the score: emerald (strong fit),
 * amber (partial), coral (weak).
 */
const ScoreRing = ({ value = 0, size = 132, stroke = 10, label = 'MATCH' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const tone =
    clamped >= 80
      ? { a: '#1FE0A8', b: '#5FFBD0', glow: 'rgba(31,224,168,0.45)' }
      : clamped >= 60
        ? { a: '#FFB86B', b: '#FFD79B', glow: 'rgba(255,184,107,0.4)' }
        : { a: '#FF5C8A', b: '#FF8FB0', glow: 'rgba(255,92,138,0.4)' };

  useEffect(() => {
    if (!inView) return undefined;
    let raf;
    const start = performance.now();
    const duration = 1200;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * clamped));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, clamped]);

  const gradId = `jf-ring-${label}-${clamped}`;

  return (
    <div ref={ref} style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={tone.a} />
            <stop offset="100%" stopColor={tone.b} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(146,142,222,0.12)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: inView ? circumference - (circumference * clamped) / 100 : circumference }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ filter: `drop-shadow(0 0 8px ${tone.glow})` }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="jf-display"
          style={{ fontSize: size * 0.26, fontWeight: 700, lineHeight: 1, color: '#fff' }}
        >
          {display}
          <span style={{ fontSize: size * 0.13, color: tone.a }}>%</span>
        </span>
        <span
          style={{
            fontSize: 10,
            letterSpacing: '0.25em',
            color: 'var(--jf-text-dim)',
            marginTop: 4,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default ScoreRing;
