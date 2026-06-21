import { IconBrandGithub, IconBrandLinkedin, IconMail, IconArrowUp } from '@tabler/icons-react';
import Reveal from '@/components/core/Reveal';
import Magnetic from '@/components/core/Magnetic';

const socials = [
  { href: 'https://github.com/HxnDev', icon: IconBrandGithub, label: 'GitHub' },
  {
    href: 'https://www.linkedin.com/in/hassan-shahzad-2a6617212/',
    icon: IconBrandLinkedin,
    label: 'LinkedIn',
  },
  { href: 'mailto:hassanshahzad.dev@gmail.com', icon: IconMail, label: 'Email' },
];

const Footer = () => {
  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ padding: '80px 20px 40px', position: 'relative', zIndex: 1 }}>
      <Reveal>
        <div
          className="jf-glass jf-border-gradient"
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            padding: '40px clamp(24px, 5vw, 56px)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 32,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ maxWidth: 380 }}>
            <h3
              className="jf-display"
              style={{ margin: 0, fontSize: 26, color: '#fff', letterSpacing: '-0.02em' }}
            >
              Land the <span className="jf-gradient-text">right</span> role.
            </h3>
            <p style={{ color: 'var(--jf-text-dim)', marginTop: 10, lineHeight: 1.6 }}>
              JobFit reads your resume, scores the fit, and writes what you need — all in your
              browser, powered by your own Gemini key.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <Magnetic key={s.label} strength={0.4}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                        display: 'grid',
                        placeItems: 'center',
                        color: 'var(--jf-text)',
                        background: 'rgba(123,108,255,0.1)',
                        border: '1px solid rgba(146,142,222,0.18)',
                      }}
                    >
                      <Icon size={20} />
                    </a>
                  </Magnetic>
                );
              })}
            </div>
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={toTop}
                className="jf-interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 18px',
                  borderRadius: 999,
                  background: 'transparent',
                  border: '1px solid rgba(146,142,222,0.25)',
                  color: 'var(--jf-text)',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Back to top <IconArrowUp size={15} />
              </button>
            </Magnetic>
          </div>
        </div>
      </Reveal>

      <p
        style={{
          textAlign: 'center',
          color: 'var(--jf-text-faint)',
          fontSize: 13,
          marginTop: 28,
        }}
      >
        © {new Date().getFullYear()} JobFit · crafted by Hassan Shahzad
      </p>
    </footer>
  );
};

export default Footer;
