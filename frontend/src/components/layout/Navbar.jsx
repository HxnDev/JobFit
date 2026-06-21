import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from '@mantine/core';
import {
  IconSparkles,
  IconFileText,
  IconMail,
  IconMessageCircle,
  IconKey,
  IconLogout,
  IconMenu2,
  IconX,
} from '@tabler/icons-react';
import Magnetic from '@/components/core/Magnetic';
import { ApiKeyContext } from '@/App';

const NAV = [
  { to: '/', label: 'Analyze', icon: IconSparkles },
  { to: '/templates', label: 'Templates', icon: IconFileText },
  { to: '/email-tools', label: 'Email', icon: IconMail },
  { to: '/interview-prep', label: 'Interview', icon: IconMessageCircle },
];

const Logo = () => (
  <Magnetic strength={0.5}>
    <Link
      to="/"
      style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
    >
      <span
        style={{
          width: 34,
          height: 34,
          borderRadius: 11,
          display: 'grid',
          placeItems: 'center',
          background: 'linear-gradient(135deg, #7B6CFF, #1FE0A8)',
          boxShadow: '0 0 22px rgba(123,108,255,0.5)',
          fontFamily: 'var(--jf-font-display)',
          fontWeight: 700,
          color: '#06070e',
          fontSize: 16,
        }}
      >
        JF
      </span>
      <span
        className="jf-display"
        style={{ fontWeight: 700, fontSize: 19, color: '#fff', letterSpacing: '-0.02em' }}
      >
        Job<span className="jf-gradient-text">Fit</span>
      </span>
    </Link>
  </Magnetic>
);

const Navbar = () => {
  const location = useLocation();
  const { clearApiKey } = useContext(ApiKeyContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          padding: '18px 16px',
          pointerEvents: 'none',
        }}
      >
        <nav
          className="jf-glass"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 18,
            width: '100%',
            maxWidth: 1080,
            padding: '10px 14px 10px 18px',
            borderRadius: 999,
          }}
        >
          <Logo />

          {/* Desktop links */}
          <div className="jf-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {NAV.map((item) => {
              const active = location.pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '9px 16px',
                    borderRadius: 999,
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    color: active ? '#fff' : 'var(--jf-text-dim)',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="jf-nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 999,
                        background: 'rgba(123,108,255,0.16)',
                        border: '1px solid rgba(157,140,255,0.4)',
                      }}
                    />
                  )}
                  <Icon size={16} style={{ position: 'relative', zIndex: 1 }} />
                  <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Menu position="bottom-end" withArrow shadow="md">
              <Menu.Target>
                <button
                  type="button"
                  className="jf-interactive"
                  title="API key settings"
                  style={iconBtnStyle}
                >
                  <IconKey size={17} />
                </button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Gemini API key</Menu.Label>
                <Menu.Item icon={<IconLogout size={15} />} color="red" onClick={clearApiKey}>
                  Clear API key
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <button
              type="button"
              className="jf-nav-burger jf-interactive"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              style={{ ...iconBtnStyle, display: 'none' }}
            >
              <IconMenu2 size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2000,
              background: 'rgba(6,7,14,0.86)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              padding: '28px 24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                style={iconBtnStyle}
              >
                <IconX size={20} />
              </button>
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              {NAV.map((item, i) => {
                const Icon = item.icon;
                const active = location.pathname === item.to;
                return (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * i + 0.1 }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        padding: '16px 8px',
                        textDecoration: 'none',
                        fontFamily: 'var(--jf-font-display)',
                        fontSize: 30,
                        fontWeight: 600,
                        color: active ? '#fff' : 'var(--jf-text-dim)',
                      }}
                    >
                      <Icon size={26} color={active ? '#5FFBD0' : 'var(--jf-text-dim)'} />
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const iconBtnStyle = {
  width: 38,
  height: 38,
  borderRadius: 999,
  display: 'grid',
  placeItems: 'center',
  background: 'rgba(123,108,255,0.1)',
  border: '1px solid rgba(146,142,222,0.18)',
  color: 'var(--jf-text)',
  cursor: 'pointer',
};

export default Navbar;
