import React from 'react';
import { Box } from '@mantine/core';
import { motion } from 'framer-motion';

/**
 * Cinematic page header: an eyebrow chip, a large gradient title, and an
 * optional description. Drop-in replacement for the legacy header.
 */
const PageHeader = ({ title, description, icon, extra, eyebrow = 'JOBFIT' }) => (
  <Box mb={40}>
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: '#5FFBD0',
              letterSpacing: '0.3em',
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            {icon}
            <span>{eyebrow}</span>
          </div>
          <h1
            className="jf-display"
            style={{
              fontSize: 'clamp(2.1rem, 5vw, 3.2rem)',
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: '-0.02em',
              color: '#fff',
            }}
          >
            {title}
          </h1>
        </div>
        {extra && <Box>{extra}</Box>}
      </div>

      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            maxWidth: 760,
            marginTop: 18,
            fontSize: '1.05rem',
            lineHeight: 1.65,
            color: 'var(--jf-text-dim)',
          }}
        >
          {description}
        </motion.p>
      )}

      <div
        style={{
          height: 1,
          marginTop: 28,
          background:
            'linear-gradient(90deg, rgba(157,140,255,0.5), rgba(31,224,168,0.2) 40%, transparent)',
        }}
      />
    </motion.div>
  </Box>
);

export default PageHeader;
