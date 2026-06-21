import React from 'react';
import { Group, Title, Badge } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { motion } from 'framer-motion';

/**
 * Glass step card with a gradient index medallion, an active glow ring, and a
 * completed state. Keeps the original prop contract.
 */
const StepCard = ({
  title,
  stepNumber,
  icon,
  badge,
  badgeColor = 'blue',
  children,
  isActive = false,
  isCompleted = false,
}) => {
  const accent = isCompleted ? '#1FE0A8' : isActive ? '#9D8CFF' : 'rgba(146,142,222,0.25)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: stepNumber * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ position: 'relative' }}
    >
      <div
        className="jf-glass"
        style={{
          position: 'relative',
          padding: 'clamp(22px, 4vw, 34px)',
          paddingTop: 38,
          border: `1px solid ${isActive || isCompleted ? accent : 'rgba(146,142,222,0.14)'}`,
          boxShadow: isActive
            ? '0 0 0 1px rgba(157,140,255,0.25), 0 24px 70px rgba(123,108,255,0.12)'
            : 'none',
          transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          overflow: 'visible',
        }}
      >
        {/* Index medallion */}
        <div
          style={{
            position: 'absolute',
            top: -20,
            left: 26,
            width: 40,
            height: 40,
            borderRadius: 13,
            display: 'grid',
            placeItems: 'center',
            color: isActive || isCompleted ? '#06070e' : 'var(--jf-text-dim)',
            background:
              isActive || isCompleted
                ? 'linear-gradient(135deg, #9D8CFF, #5FFBD0)'
                : 'rgba(20,22,36,0.9)',
            border: isActive || isCompleted ? 'none' : '1px solid rgba(146,142,222,0.25)',
            boxShadow: isActive || isCompleted ? '0 8px 24px rgba(123,108,255,0.4)' : 'none',
            fontFamily: 'var(--jf-font-display)',
            fontWeight: 700,
          }}
        >
          {isCompleted ? <IconCheck size={20} stroke={3} /> : icon || stepNumber}
        </div>

        <Group position="apart" mb="lg" mt={4} align="center">
          <Title order={3} style={{ fontSize: 22, color: '#fff' }}>
            {title}
          </Title>
          {badge && (
            <Badge
              size="lg"
              variant="outline"
              color={badgeColor}
              styles={{
                root: {
                  borderColor: badgeColor === 'gray' ? 'rgba(146,142,222,0.3)' : undefined,
                  color: badgeColor === 'gray' ? 'var(--jf-text-dim)' : undefined,
                },
              }}
            >
              {badge}
            </Badge>
          )}
        </Group>

        {children}
      </div>
    </motion.div>
  );
};

export default StepCard;
