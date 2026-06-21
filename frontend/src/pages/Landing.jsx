import { useState } from 'react';
import {
  TextInput,
  Accordion,
  Anchor,
  List,
  Alert,
  ThemeIcon,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { motion } from 'framer-motion';
import {
  IconSparkles,
  IconFileText,
  IconShieldCheck,
  IconMessages,
  IconSchool,
  IconPencil,
  IconKey,
  IconArrowRight,
  IconCheck,
  IconExternalLink,
  IconLock,
  IconChevronDown,
} from '@tabler/icons-react';
import Reveal from '@/components/core/Reveal';
import Magnetic from '@/components/core/Magnetic';
import Footer from '@/components/layout/Footer';
import { saveApiKey, validateApiKey } from '@/utils/apiConfig';

const FEATURES = [
  {
    icon: IconSparkles,
    title: 'Fit Score',
    desc: 'Drop in any job description and see a precise match percentage with the skills you have and the gaps you don’t.',
  },
  {
    icon: IconFileText,
    title: 'Cover Letters',
    desc: 'Tailored, recruiter-ready cover letters generated in seconds — in the language of your choice.',
  },
  {
    icon: IconShieldCheck,
    title: 'ATS Optimizer',
    desc: 'See how your resume reads to applicant tracking systems and surface the keywords you’re missing.',
  },
  {
    icon: IconMessages,
    title: 'Interview Prep',
    desc: 'Role-specific questions, a live mock interview, and honest feedback on every answer.',
  },
  {
    icon: IconSchool,
    title: 'Learning Paths',
    desc: 'Turn each missing skill into a curated path of courses, articles and videos to close the gap.',
  },
  {
    icon: IconPencil,
    title: 'Letters of Motivation',
    desc: 'Compelling motivational letters that explain — with conviction — why you’re the one.',
  },
];

const STEPS = [
  { n: '01', t: 'Bring your key', d: 'Paste a free Google Gemini API key. It never leaves your browser.' },
  { n: '02', t: 'Add your story', d: 'Upload your resume and the roles you’re chasing.' },
  { n: '03', t: 'Get your edge', d: 'Scores, letters, ATS fixes and interview reps — instantly.' },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -40, duration: 1.2 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

const Landing = ({ onSaved }) => {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!validateApiKey(apiKey)) {
      setError('That doesn’t look like a valid Gemini key — please paste the full key from Google AI Studio.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const ok = saveApiKey(apiKey);
      if (ok) {
        notifications.show({
          title: 'You’re in',
          message: 'API key saved locally. Let’s find your fit.',
          color: 'teal',
        });
        if (typeof onSaved === 'function') onSaved(apiKey);
      } else {
        setError('Couldn’t save the key — check your browser storage permissions.');
        setLoading(false);
      }
    }, 450);
  };

  const headline = ['Find', 'your', 'fit.'];

  return (
    <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}>
      {/* ---------------------------------------------------------- HERO */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 20px 60px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="jf-glass"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            padding: '8px 16px',
            borderRadius: 999,
            fontSize: 13,
            color: 'var(--jf-text-dim)',
            marginBottom: 30,
          }}
        >
          <IconSparkles size={15} color="#5FFBD0" />
          AI career co-pilot · powered by Gemini
        </motion.div>

        <h1
          className="jf-display"
          style={{
            fontSize: 'clamp(2.8rem, 9vw, 6.5rem)',
            lineHeight: 0.98,
            margin: 0,
            fontWeight: 700,
            letterSpacing: '-0.03em',
          }}
        >
          <span style={{ display: 'block' }}>
            {headline.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ display: 'inline-block', marginRight: '0.25em' }}
              >
                {w}
              </motion.span>
            ))}
          </span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="jf-gradient-text"
            style={{ display: 'block' }}
          >
            Land the role.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{
            maxWidth: 620,
            margin: '28px auto 0',
            fontSize: 'clamp(1rem, 2.2vw, 1.22rem)',
            lineHeight: 1.6,
            color: 'var(--jf-text-dim)',
          }}
        >
          JobFit reads your resume against any job, scores the match, and writes the cover letter,
          beats the ATS, and drills you for the interview — all in your browser.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
          style={{ display: 'flex', gap: 14, marginTop: 40, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Magnetic strength={0.45}>
            <button
              type="button"
              onClick={() => scrollTo('jf-key')}
              className="jf-interactive"
              style={primaryBtn}
            >
              Start free <IconArrowRight size={18} />
            </button>
          </Magnetic>
          <button
            type="button"
            onClick={() => scrollTo('jf-how')}
            style={ghostBtn}
            className="jf-interactive"
          >
            How it works
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.6, duration: 1 }}
          style={{ marginTop: 70, color: 'var(--jf-text-faint)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <span style={{ fontSize: 11, letterSpacing: '0.3em' }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <IconChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>

      {/* ------------------------------------------------------ FEATURES */}
      <section style={section}>
        <Reveal>
          <p style={eyebrow}>EVERYTHING, IN ONE FLOW</p>
          <h2 className="jf-display" style={h2}>
            A full application, <span className="jf-gradient-text">handled</span>.
          </h2>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: 20,
            marginTop: 48,
          }}
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="jf-glass jf-border-gradient jf-interactive"
                  style={{ padding: 28, height: '100%' }}
                >
                  <ThemeIcon
                    size={52}
                    radius="md"
                    variant="gradient"
                    gradient={{ from: '#7B6CFF', to: '#1FE0A8' }}
                    style={{ boxShadow: '0 8px 30px rgba(123,108,255,0.35)' }}
                  >
                    <Icon size={26} />
                  </ThemeIcon>
                  <h3 className="jf-display" style={{ fontSize: 21, margin: '20px 0 8px', color: '#fff' }}>
                    {f.title}
                  </h3>
                  <p style={{ color: 'var(--jf-text-dim)', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------ HOW IT WORKS */}
      <section id="jf-how" style={section}>
        <Reveal>
          <p style={eyebrow}>THREE STEPS</p>
          <h2 className="jf-display" style={h2}>
            From upload to <span className="jf-gradient-text">offer-ready</span>.
          </h2>
        </Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            marginTop: 48,
          }}
        >
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="jf-glass" style={{ padding: 30, height: '100%' }}>
                <span
                  className="jf-display"
                  style={{
                    fontSize: 52,
                    fontWeight: 700,
                    background: 'linear-gradient(180deg, rgba(157,140,255,0.9), rgba(157,140,255,0.15))',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {s.n}
                </span>
                <h3 className="jf-display" style={{ fontSize: 22, margin: '8px 0 10px', color: '#fff' }}>
                  {s.t}
                </h3>
                <p style={{ color: 'var(--jf-text-dim)', lineHeight: 1.6, margin: 0 }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ API KEY CARD */}
      <section id="jf-key" style={{ ...section, paddingBottom: 40 }}>
        <Reveal>
          <div
            className="jf-glass jf-border-gradient"
            style={{
              maxWidth: 720,
              margin: '0 auto',
              padding: 'clamp(28px, 5vw, 52px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
              <ThemeIcon
                size={48}
                radius="md"
                variant="gradient"
                gradient={{ from: '#7B6CFF', to: '#1FE0A8' }}
              >
                <IconKey size={24} />
              </ThemeIcon>
              <div>
                <h2 className="jf-display" style={{ margin: 0, fontSize: 28, color: '#fff' }}>
                  Bring your own key
                </h2>
                <p style={{ margin: 0, color: 'var(--jf-text-dim)', fontSize: 14 }}>
                  Free from Google AI Studio · stored only on this device
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: 26 }}>
              <TextInput
                size="md"
                placeholder="Paste your Gemini API key from Google AI Studio"
                icon={<IconKey size={16} />}
                value={apiKey}
                onChange={(e) => setApiKey(e.currentTarget.value)}
                error={error}
                autoComplete="off"
              />
              <Magnetic strength={0.25} style={{ display: 'block', marginTop: 16 }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="jf-interactive"
                  style={{ ...primaryBtn, width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Saving…' : 'Save key & enter JobFit'}
                  {!loading && <IconArrowRight size={18} />}
                </button>
              </Magnetic>
            </form>

            <Alert
              icon={<IconLock size={16} />}
              color="teal"
              variant="light"
              mt="lg"
              styles={{ root: { background: 'rgba(31,224,168,0.08)', borderColor: 'rgba(31,224,168,0.25)' } }}
            >
              Your key lives in <strong>localStorage</strong> only. It’s never sent to our servers —
              just straight to Google for your requests.
            </Alert>

            <Accordion mt="lg" variant="separated" radius="md">
              <Accordion.Item value="how">
                <Accordion.Control icon={<IconCheck size={16} color="#5FFBD0" />}>
                  How do I get a free Gemini key?
                </Accordion.Control>
                <Accordion.Panel>
                  <List spacing="xs" size="sm">
                    <List.Item>
                      Open{' '}
                      <Anchor href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer">
                        Google AI Studio <IconExternalLink size={12} />
                      </Anchor>
                    </List.Item>
                    <List.Item>Sign in with your Google account</List.Item>
                    <List.Item>Go to “API Keys” → “Create API key”</List.Item>
                    <List.Item>Copy it and paste it above</List.Item>
                  </List>
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="privacy">
                <Accordion.Control icon={<IconShieldCheck size={16} color="#5FFBD0" />}>
                  Is my data safe?
                </Accordion.Control>
                <Accordion.Panel>
                  <List spacing="xs" size="sm">
                    <List.Item>The key is stored only in your browser’s local storage.</List.Item>
                    <List.Item>Requests are transmitted over HTTPS.</List.Item>
                    <List.Item>Nothing is persisted on our servers.</List.Item>
                    <List.Item>Clear it anytime from the key menu in the top bar.</List.Item>
                  </List>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
};

/* ---- inline style helpers ---------------------------------------------- */
const section = {
  maxWidth: 1080,
  margin: '0 auto',
  padding: 'clamp(60px, 10vw, 120px) 20px 0',
};

const eyebrow = {
  color: '#5FFBD0',
  letterSpacing: '0.3em',
  fontSize: 12,
  fontWeight: 600,
  margin: 0,
};

const h2 = {
  fontSize: 'clamp(2rem, 5vw, 3.2rem)',
  margin: '14px 0 0',
  color: '#fff',
  letterSpacing: '-0.02em',
};

const primaryBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '15px 28px',
  borderRadius: 999,
  border: 'none',
  cursor: 'pointer',
  fontSize: 15,
  fontWeight: 700,
  color: '#06070e',
  background: 'linear-gradient(120deg, #9D8CFF, #5FFBD0)',
  boxShadow: '0 10px 40px rgba(123,108,255,0.4)',
};

const ghostBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '15px 28px',
  borderRadius: 999,
  border: '1px solid rgba(146,142,222,0.3)',
  cursor: 'pointer',
  fontSize: 15,
  fontWeight: 600,
  color: 'var(--jf-text)',
  textDecoration: 'none',
  background: 'transparent',
};

export default Landing;
