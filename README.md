# JobFit — AI Career Co-Pilot

JobFit reads your resume against any job, scores the match, and then writes the cover letter, beats the ATS, and drills you for the interview — all in your browser, powered by your own Google Gemini key.

It's also a statement piece: a cinematic, scroll-driven **"Neural Noir"** interface with a hand-written GLSL aurora shader, a floating 3D "intelligence core", a magnetic cursor, and buttery motion throughout.

**Live Application:** [https://jobfit.hxndev.com](https://jobfit.hxndev.com)

## Highlights

- **Live WebGL backdrop.** A custom GLSL aurora shader (domain-warped fractal noise) that drifts and reacts to the cursor, plus a distorting icosahedron "core" with a wireframe shell and bloom — no Spline, no shader libraries.
- **"Neural Noir" design system.** A deep near-black canvas with an electric **violet** (intelligence) primary and an **emerald/mint** (the "match/fit" signal) accent, with rare coral highlights.
- **Cinematic motion.** A boot preloader, Lenis momentum smooth-scrolling, Framer Motion page transitions and scroll reveals, a magnetic dual-layer custom cursor, and an animated match-score ring that counts up.
- **A real product flow.** A landing/onboarding hero gates into the app; a glass top-nav replaces the old sidebar; the analysis flow uses animated step rails and an animated `ScoreRing`.
- **Performance-conscious & accessible.** The 3D layer is lazy-loaded (never blocks first paint), device-tiered, wrapped in an error boundary, and fully skipped under `prefers-reduced-motion` (a CSS gradient remains).

## Features

### Resume Analysis

- **Job Fit Analysis:** Compare your resume against job descriptions to receive a match percentage.
- **Skill Identification:** See which skills you have and which ones you need to develop.
- **Personalized Recommendations:** Get tailored advice to improve your application.

### Professional Content Generation

- **Cover Letter Generator:** Create customized cover letters in multiple languages.
- **Letter of Motivation:** Generate compelling motivational letters explaining why you're the right fit.
- **Email Reply Tool:** Draft professional email responses to recruiters and hiring managers.

### ATS Optimization

- **ATS Compatibility Check:** Analyze how well your resume will perform with Applicant Tracking Systems.
- **Keyword Analysis:** Identify missing keywords that could improve your resume's visibility.

### Interview Preparation

- **Custom Interview Questions:** Generate job-specific interview questions.
- **Mock Interviews:** Practice with an AI-powered mock interview system.
- **Performance Feedback:** Receive detailed feedback on your interview answers.
- **Company Research Points:** Get suggestions for researching your target company.

### Learning Resources & Templates

- **Customized Learning Paths:** Turn each missing skill into a curated path of courses, articles and videos.
- **Resume Templates:** Download professional, ATS-friendly templates and formatting guides.

## How to Use

1. **Visit** the live application at [https://jobfit.hxndev.com](https://jobfit.hxndev.com).
2. **Provide a Google Gemini API Key** when prompted (used to power the AI features).
3. **Upload your resume** (PDF, DOCX or TXT) or paste it as text.
4. **Enter job details** for the positions you're interested in.
5. **Analyze and improve** your application materials using JobFit's tools.

## Getting a Google Gemini API Key

JobFit uses Google's Gemini AI. You provide your own free key:

1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Navigate to **API Keys** in the sidebar.
4. Click **Create API Key** and copy it.
5. Paste the key into JobFit when prompted.

## Privacy & Security

- Your API key is stored only in your browser's local storage.
- Requests are transmitted over HTTPS, straight to Google.
- Nothing is persisted on our servers. Clear the key any time from the key menu in the top bar.

## Tech Stack

### Frontend

- **React 18 + Vite** — fast SPA tooling and HMR.
- **Mantine UI 6** — component library, re-themed into the dark "Neural Noir" design system.
- **Three.js + @react-three/fiber + @react-three/drei** — declarative 3D.
- **@react-three/postprocessing** — bloom and post effects.
- **Custom GLSL** — the aurora backdrop fragment shader.
- **Framer Motion** — page transitions, reveals and the magnetic cursor.
- **Lenis** — momentum smooth scrolling.
- **React Router 6** — client-side routing (HashRouter, so it works on any static host without rewrites).
- **Axios** — API requests · **Tabler Icons** — iconography.
- **ESLint + Prettier** — code quality and formatting.

### Backend

- **Flask (Python)** with the **Google Generative AI** API and **PyPDF2** for PDF processing.

## Getting Started

```bash
# from the repo root
cd frontend

# install (pinned to the React-18-compatible 3D stack)
npm install --legacy-peer-deps

# develop (http://localhost:5173)
npm run dev

# production build → ./dist
npm run build

# preview the production build
npm run serve
```

### Quality checks

```bash
npm run lint          # ESLint
npm run format        # Prettier (write)
npm run format:check  # Prettier (check)
npm run check         # format check + lint
```

## Import Alias

`@` resolves to `frontend/src` (configured in `vite.config.js`, with editor support via `jsconfig.json`):

```js
import Magnetic from '@/components/core/Magnetic';
import { getApiUrl } from '@/utils/apiConfig';
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── core/             # Cinematic layer: AuroraBackground (GLSL),
│   │   │                     #   CustomCursor, Preloader, SmoothScroll,
│   │   │                     #   Reveal, Magnetic, ScoreRing
│   │   ├── layout/           # Navbar (glass top-nav), Footer
│   │   ├── InterviewPreparation/
│   │   └── ...               # ResumeUpload, JobInputForm, JobResults, etc.
│   ├── pages/                # Landing, Home, EmailTools, TemplateDownloads,
│   │                         #   InterviewPrep
│   ├── styles/               # global.css (design tokens, cursor, helpers)
│   ├── utils/                # apiConfig (API key + endpoints)
│   ├── theme.js              # Mantine "Neural Noir" theme
│   ├── App.jsx               # Providers, layout, routing + page transitions
│   └── index.jsx             # Entry point
├── index.html
├── vite.config.js
└── jsconfig.json
```

## Architecture Notes

- **Decorative 3D, decoupled.** `AuroraBackground` is `React.lazy`-loaded and runs on its own `requestAnimationFrame` loop, so the heavy three.js bundle never blocks the UI and a WebGL failure can't crash the app.
- **Theme-driven restyle.** The Mantine theme remaps `blue` → violet and `green` → emerald, so existing components inherited the new identity instantly, on top of glass panels, glow buttons and dark inputs/modals.
- **Accessibility.** Honors reduced motion (disables smooth scroll, freezes/drops the 3D), keeps the OS cursor on touch/coarse-pointer devices, and uses a colorblind-friendly luminance hierarchy.

## Deployment

- **Frontend** → [Vercel](https://vercel.com) at the custom domain **[jobfit.hxndev.com](https://jobfit.hxndev.com)**. The Vercel project uses `frontend/` as its **Root Directory** (framework: Vite, build: `npm run build`, output: `dist`). `frontend/.npmrc` enables `legacy-peer-deps` so installs resolve the React-18 3D stack. The app is served at the domain root, so `base` defaults to `/` (override with `VITE_BASE_PATH=/JobFit/` only for a sub-path host like GitHub Pages).
- **Backend** → [Render](https://render.com) at `https://jobfit-backend.onrender.com`. Production CORS allows `https://jobfit.hxndev.com` (plus `*.vercel.app` previews). The Gemini model is configurable via the `GEMINI_MODEL` env var (defaults to `gemini-2.5-flash`).

## Contribute

- [Open an issue](https://github.com/HxnDev/JobFit/issues)
- [Connect on LinkedIn](https://www.linkedin.com/in/hassan-shahzad-2a6617212/)
- Send feature requests to hassanshahzad.dev@gmail.com

## License

Distributed under the MIT License. See `LICENSE` for details.

---

© 2026 JobFit · crafted by Hassan Shahzad
