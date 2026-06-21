import React, { useState, useEffect, createContext, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AnimatePresence, motion } from 'framer-motion';

import Home from '@/pages/Home';
import EmailTools from '@/pages/EmailTools';
import TemplateDownloads from '@/pages/TemplateDownloads';
import InterviewPrep from '@/pages/InterviewPrep';
import Landing from '@/pages/Landing';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/core/Preloader';
import CustomCursor from '@/components/core/CustomCursor';
import SmoothScroll from '@/components/core/SmoothScroll';
import CanvasErrorBoundary from '@/components/core/CanvasErrorBoundary';

// Heavy (three.js) — loaded after first paint so it never blocks the UI.
const AuroraBackground = lazy(() => import('@/components/core/AuroraBackground'));

import { themeConfig } from '@/theme';
import { hasValidApiKey, clearApiKey } from '@/utils/apiConfig';

// Context for API key status (consumed across the app)
export const ApiKeyContext = createContext({
  hasApiKey: false,
  refreshApiKeyStatus: () => {},
  clearApiKey: () => {},
});

function AnimatedRoutes() {
  const location = useLocation();

  // Scroll to top on route change (respect Lenis if present)
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/email-tools" element={<EmailTools />} />
          <Route path="/templates" element={<TemplateDownloads />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [hasApiKey, setHasApiKey] = useState(() => hasValidApiKey());

  const checkApiKeyStatus = () => {
    const isValid = hasValidApiKey();
    setHasApiKey(isValid);
    return isValid;
  };

  const handleClearApiKey = () => {
    clearApiKey();
    checkApiKeyStatus();
  };

  const apiKeyContextValue = {
    hasApiKey,
    refreshApiKeyStatus: checkApiKeyStatus,
    clearApiKey: handleClearApiKey,
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={themeConfig}>
      <Notifications position="top-right" zIndex={20000} />
      <Preloader />
      <CustomCursor />
      <CanvasErrorBoundary>
        <Suspense fallback={null}>
          <AuroraBackground />
        </Suspense>
      </CanvasErrorBoundary>

      <ApiKeyContext.Provider value={apiKeyContextValue}>
        <Router>
          <SmoothScroll>
            {!hasApiKey ? (
              <Landing onSaved={checkApiKeyStatus} />
            ) : (
              <div style={{ position: 'relative', zIndex: 1 }}>
                <Navbar />
                <main style={{ paddingTop: 116, minHeight: '70vh' }}>
                  <AnimatedRoutes />
                </main>
                <Footer />
              </div>
            )}
          </SmoothScroll>
        </Router>
      </ApiKeyContext.Provider>
    </MantineProvider>
  );
}

export default App;
