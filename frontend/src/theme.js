/**
 * JobFit — "Neural Noir" Mantine theme.
 *
 * A dark, cinematic design system. We intentionally remap Mantine's `blue`
 * palette onto our electric-violet brand ramp so the dozens of existing
 * `color="blue"` usages across the app instantly inherit the new identity,
 * and `green` onto an emerald "match" ramp.
 */

const violet = [
  '#EEEBFF', // 0
  '#D8D0FF', // 1
  '#BBADFF', // 2
  '#9D8CFF', // 3
  '#8979FF', // 4
  '#7B6CFF', // 5  ← primary
  '#6A5BF0', // 6
  '#5747D6', // 7
  '#4536B0', // 8
  '#332889', // 9
];

const emerald = [
  '#E2FFF6', // 0
  '#BFFCEA', // 1
  '#8FF6D8', // 2
  '#5FFBD0', // 3
  '#36EEBC', // 4
  '#1FE0A8', // 5  ← match accent
  '#15C291', // 6
  '#0E9C75', // 7
  '#0A7659', // 8
  '#06513D', // 9
];

const dark = [
  '#C9CDE6', // 0  text on dark
  '#A3A8C3', // 1
  '#888EAE', // 2
  '#646A90', // 3
  '#383D5C', // 4  borders
  '#262A40', // 5
  '#161826', // 6  surface
  '#0E0F1A', // 7  surface deep
  '#0A0B14', // 8  bg
  '#06070E', // 9  deepest
];

export const themeConfig = {
  colorScheme: 'dark',
  primaryColor: 'blue',
  primaryShade: { light: 5, dark: 5 },

  colors: {
    blue: violet,
    violet,
    green: emerald,
    emerald,
    dark,
    coral: [
      '#FFE7EE',
      '#FFC2D4',
      '#FF9BB8',
      '#FF749C',
      '#FF6491',
      '#FF5C8A',
      '#E84A77',
      '#C73862',
      '#A2284C',
      '#7C1936',
    ],
  },

  defaultRadius: 'lg',
  radius: {
    xs: '8px',
    sm: '10px',
    md: '14px',
    lg: '18px',
    xl: '24px',
  },

  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontFamilyMonospace: "'Space Grotesk', Monaco, monospace",

  headings: {
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    fontWeight: 700,
    sizes: {
      h1: { fontSize: '2.6rem', lineHeight: 1.1 },
      h2: { fontSize: '1.9rem', lineHeight: 1.2 },
      h3: { fontSize: '1.4rem', lineHeight: 1.3 },
      h4: { fontSize: '1.15rem', lineHeight: 1.4 },
      h5: { fontSize: '1rem', lineHeight: 1.5 },
      h6: { fontSize: '0.875rem', lineHeight: 1.5 },
    },
  },

  shadows: {
    xs: '0 1px 2px rgba(0,0,0,0.4)',
    sm: '0 4px 14px rgba(0,0,0,0.35)',
    md: '0 12px 40px rgba(0,0,0,0.45)',
    lg: '0 24px 70px rgba(0,0,0,0.55)',
    xl: '0 32px 90px rgba(0,0,0,0.6)',
  },

  other: {
    glow: {
      violet: '0 0 0 1px rgba(123,108,255,0.4), 0 10px 40px rgba(123,108,255,0.35)',
      emerald: '0 0 0 1px rgba(31,224,168,0.4), 0 10px 40px rgba(31,224,168,0.3)',
    },
  },

  components: {
    Paper: {
      defaultProps: { radius: 'lg' },
      styles: () => ({
        root: {
          backgroundColor: 'rgba(20, 22, 36, 0.55)',
          backdropFilter: 'blur(18px) saturate(140%)',
          WebkitBackdropFilter: 'blur(18px) saturate(140%)',
          border: '1px solid rgba(146, 142, 222, 0.14)',
          color: 'var(--jf-text)',
        },
      }),
    },

    Card: {
      defaultProps: { radius: 'lg' },
      styles: () => ({
        root: {
          backgroundColor: 'rgba(20, 22, 36, 0.55)',
          backdropFilter: 'blur(18px) saturate(140%)',
          WebkitBackdropFilter: 'blur(18px) saturate(140%)',
          border: '1px solid rgba(146, 142, 222, 0.14)',
          transition: 'transform 0.35s cubic-bezier(0.2,0.8,0.2,1), border-color 0.35s ease, box-shadow 0.35s ease',
        },
      }),
    },

    Button: {
      defaultProps: { radius: 'xl' },
      styles: () => ({
        root: {
          fontWeight: 600,
          letterSpacing: '0.01em',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
      }),
    },

    ActionIcon: {
      styles: () => ({
        root: {
          transition: 'transform 0.2s ease, background-color 0.2s ease',
        },
      }),
    },

    TextInput: { defaultProps: { radius: 'md' } },
    Textarea: { defaultProps: { radius: 'md' } },
    PasswordInput: { defaultProps: { radius: 'md' } },
    Select: { defaultProps: { radius: 'md' } },

    Input: {
      styles: (theme) => ({
        input: {
          backgroundColor: 'rgba(8, 9, 18, 0.6)',
          borderColor: 'rgba(146, 142, 222, 0.2)',
          color: 'var(--jf-text)',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          '&:focus, &:focus-within': {
            borderColor: theme.colors.blue[5],
            boxShadow: `0 0 0 3px rgba(123,108,255,0.25)`,
          },
          '&::placeholder': { color: 'var(--jf-text-faint)' },
        },
      }),
    },

    Modal: {
      defaultProps: { radius: 'lg', overlayProps: { blur: 6, opacity: 0.6, color: '#04050a' } },
      styles: () => ({
        content: {
          backgroundColor: 'rgba(14, 15, 26, 0.92)',
          backdropFilter: 'blur(24px) saturate(150%)',
          border: '1px solid rgba(146, 142, 222, 0.18)',
        },
        header: { backgroundColor: 'transparent' },
        title: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem' },
      }),
    },

    Badge: {
      styles: () => ({
        root: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
      }),
    },

    Divider: {
      styles: () => ({
        root: { borderColor: 'rgba(146, 142, 222, 0.14)' },
      }),
    },

    Tabs: {
      styles: (theme) => ({
        tab: {
          '&[data-active]': { borderColor: theme.colors.blue[5] },
        },
      }),
    },

    Title: {
      styles: () => ({ root: { color: 'var(--jf-text)' } }),
    },

    Text: {
      styles: () => ({ root: { color: 'var(--jf-text)' } }),
    },

    Alert: {
      styles: () => ({
        root: { backgroundColor: 'rgba(20, 22, 36, 0.6)', border: '1px solid rgba(146,142,222,0.18)' },
      }),
    },

    Accordion: {
      styles: () => ({
        item: { backgroundColor: 'transparent', borderColor: 'rgba(146,142,222,0.14)' },
        control: { '&:hover': { backgroundColor: 'rgba(123,108,255,0.08)' } },
      }),
    },

    Tooltip: {
      styles: () => ({
        tooltip: {
          backgroundColor: 'rgba(14,15,26,0.95)',
          border: '1px solid rgba(146,142,222,0.2)',
          color: 'var(--jf-text)',
          backdropFilter: 'blur(8px)',
        },
      }),
    },
  },
};

/* ---- Backwards-compatible exports (used across components) -------------- */

export const gradients = {
  primary: { from: '#7B6CFF', to: '#5B5BFF' },
  secondary: { from: '#1FE0A8', to: '#5FFBD0' },
  success: { from: '#1FE0A8', to: '#15C291' },
  info: { from: '#7B6CFF', to: '#9D8CFF' },
  warning: { from: '#FFB86B', to: '#FF8A5B' },
  danger: { from: '#FF5C8A', to: '#E84A77' },
  purple: { from: '#9D8CFF', to: '#6A5BF0' },
  teal: { from: '#1FE0A8', to: '#15C291' },
  cyan: { from: '#5FFBD0', to: '#1FE0A8' },
  brand: { from: '#7B6CFF', to: '#1FE0A8' },
};

export const animations = {
  transition: 'all 0.3s cubic-bezier(0.2,0.8,0.2,1)',
  hover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
  },
};

export const styleHelpers = {
  gradientText: {
    background: 'linear-gradient(100deg, #9D8CFF 0%, #5FFBD0 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700,
  },
  cardHover: {
    transition: 'all 0.35s cubic-bezier(0.2,0.8,0.2,1)',
    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
      borderColor: 'rgba(160,150,255,0.32)',
    },
  },
  centerFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
