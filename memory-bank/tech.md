# Technical Setup

## Environment
- **Development Setup:** Node.js (v14+ recommended), npm, VS Code (or preferred editor).
- **Local Server Instructions:** Run `npm run dev` to start the Vite development server. Access via `http://localhost:5173` (usually opens automatically).

## Dependencies
- **Frontend:**
    - `react`: ^18.2.0 (UI Library)
    - `react-dom`: ^18.2.0 (React DOM rendering)
    - `@supabase/supabase-js`: ^2.x.x (Supabase client library - Check package.json for exact version)
- **Backend/Database:**
    - `supabase-js`: Used for interacting with Supabase services (Edge Functions).
    - `firebase`: ^11.4.0 (Backend-as-a-Service - included but not used in MVP)
- **Dev Dependencies:**
    - `@types/react`: ^18.2.15 (TypeScript definitions - although project uses JS/JSX)
    - `@types/react-dom`: ^18.2.7 (TypeScript definitions - although project uses JS/JSX)
    - `@vitejs/plugin-react`: ^4.0.3 (Vite React plugin)
    - `autoprefixer`: ^10.4.14 (PostCSS plugin for vendor prefixes)
    - `eslint`: ^8.45.0 (Linter)
    - `eslint-plugin-react`: ^7.32.2 (React ESLint rules)
    - `eslint-plugin-react-hooks`: ^4.6.0 (React Hooks ESLint rules)
    - `eslint-plugin-react-refresh`: ^0.4.3 (Fast Refresh ESLint rules)
    - `postcss`: ^8.4.27 (CSS processing tool)
    - `tailwindcss`: ^3.3.3 (Utility-first CSS framework)
    - `tailwindcss-textshadow`: ^2.1.3 (Tailwind plugin for text shadow)
    - `vite`: ^4.4.5 (Build tool and dev server)

## Tools & Workflows
- **Language:** JavaScript (ES6+) with JSX.
- **Build Tool:** Vite (`vite build` for production).
- **Dev Server:** Vite (`vite` or `npm run dev`).
- **Package Manager:** npm.
- **Backend Interaction:** Supabase Edge Functions invoked via `supabase-js` client.
- **Linter:** ESLint (configured via `eslint.config.js`).
- **Styling:** Tailwind CSS for layout and utility classes, supplemented by Custom CSS (`App.css`, `index.css`, inline styles) for specific pixel art styling, animations, and component details. PostCSS is used for processing CSS.
- **State Management:** Primarily React's built-in `useState` and `useEffect` hooks, particularly within the `InteractiveTradingPreview` component. Props are used to pass data to child components.
- **Version Control:** Git (implied by `.gitignore`).
- **Viewport Scaling:** `GameViewportScaler` component is used to manage display size and scaling.
- **Automated Testing:** Not currently configured or implemented for the MVP.
- **Audio:** Considered a future enhancement, not implemented in the MVP.
- **CI/CD:** Not configured.

## Deployment
- **Process:** Run `npm run build` to generate static assets in the `dist/` directory (default for Vite). Deploy these static assets to a web server or static hosting provider (e.g., Netlify, Vercel, GitHub Pages).
- **Rollback Procedures:** Depends on the hosting provider; typically involves deploying a previous version of the static assets.