import React from 'react';
import { Overlay, Box, Text } from '@mantine/core';

/**
 * Full-card overlay shown during AI work. A dual conic-gradient ring orbits a
 * glowing core over a blurred scrim, with a rotating status line.
 */
const FancyLoader = ({ visible, message = 'Processing your request...', overlayProps = {} }) => {
  if (!visible) return null;

  return (
    <Overlay
      blur={6}
      center
      zIndex={1000}
      radius="lg"
      color="rgba(6,7,14,0.72)"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      {...overlayProps}
    >
      <Box sx={{ position: 'relative', width: 96, height: 96 }}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #7B6CFF, #1FE0A8, #7B6CFF)',
            animation: 'jf-spin 1.1s linear infinite',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 6px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 6px))',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 22,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(123,108,255,0.5), transparent 70%)',
            animation: 'jf-float 2.4s ease-in-out infinite',
          }}
        />
      </Box>

      <Text mt="xl" weight={700} size="lg" className="jf-gradient-text" sx={{ letterSpacing: '0.02em' }}>
        Reading between the lines…
      </Text>
      <Text color="dimmed" size="sm" align="center" sx={{ maxWidth: 380, marginTop: 6 }}>
        {message}
      </Text>
    </Overlay>
  );
};

export default FancyLoader;
