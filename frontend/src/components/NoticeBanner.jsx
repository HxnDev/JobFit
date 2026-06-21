import React from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { motion } from 'framer-motion';

/**
 * Subtle glass advisory shown above the analysis flow.
 */
const NoticeBanner = () => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="jf-glass"
    style={{
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: '14px 18px',
      marginBottom: 28,
      border: '1px solid rgba(255,184,107,0.35)',
      background: 'rgba(10, 9, 16, 0.82)',
      backdropFilter: 'blur(22px) saturate(140%)',
      WebkitBackdropFilter: 'blur(22px) saturate(140%)',
    }}
  >
    <IconInfoCircle size={20} color="#FFB86B" style={{ flexShrink: 0, marginTop: 1 }} />
    <span style={{ fontSize: 13.5, lineHeight: 1.55, color: '#D7DAEC' }}>
      Heads up — analysing jobs by <strong style={{ color: '#fff' }}>direct link</strong> has been
      retired due to anti-scraping measures on Indeed, LinkedIn and others. Paste the job description
      directly for the best results.
    </span>
  </motion.div>
);

export default NoticeBanner;
