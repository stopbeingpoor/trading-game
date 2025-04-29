# Project Overview: Stop Being Poor Trading Simulator

## Goals
- **Primary Objective:** To create a fast-paced, high-stakes retro trading simulation game (MVP) focused on managing risk and emotion under pressure within a strict 2-minute time limit per session.
- **Deliverables (MVP):**
    - Start Screen (FR01)
    - Character Selection Screen with at least 3 options (FR02, FR03)
    - Trading Phase with core UI components (`GameHeader`, `ChartDisplay`, `TradingPanel`, `TradingActions`) (FR04, FR05)
    - Real-time candlestick chart simulation with navigation and zoom (FR07, FR08, FR09)
    - Display of current price, position details (type, entry, size, leverage, margin, PNL, liquidation price), and chart lines (FR10, FR11)
    - Adjustable leverage slider (1x-1000x) (FR13, FR14)
    - Automatic use of entire wallet balance as position size (FR12, FR18, FR19)
    - Real-time PNL calculation and dynamic wallet balance update (FR24, FR25)
    - Manual position closing (FR22, FR23)
    - Automatic liquidation mechanic based on PNL vs. entry balance (FR11, FR26, FR27)
    - 2-minute game timer (FR28, FR29)
    - Visual feedback for trader status (Sanity Meter, Heart Rate/BPM, Emotion Emoji) (FR06, FR15, FR16)
    - Game Over screen displaying results (title, final balance, total PNL, liquidation details if applicable, trade history) (FR30, FR31, FR32)
    - "Play Again" functionality to restart from Character Select (FR33)
    - Animation overlays for trade events (profit/loss/liquidation) (FR34)
- **Success Criteria:** An engaging, challenging, and playable trading simulation that captures the intended retro aesthetic and high-pressure feel, meeting all defined functional (FR) and non-functional (NFR) requirements for the MVP.

## Problem Statement
- **Problem:** To provide an entertaining and simplified simulation of the emotional and financial pressures experienced in high-leverage, short-term trading, allowing players to experience the thrill and risk in a gamified environment.
- **Target Users:** Casual gamers, individuals curious about trading, players who enjoy high-risk/reward arcade-style games, and fans of retro pixel art aesthetics.
- **Needs:** A clear, responsive, and visually thematic interface; immediate and accurate feedback on trading outcomes; intuitive controls; and engaging visual/audio cues that enhance the high-pressure atmosphere.

## User Experience
- **Desired UX:** An intense, fast-paced, and potentially stressful but ultimately rewarding gameplay experience. The UI should be intuitive despite the complexity of the underlying mechanics, prioritizing clarity of critical trading information (PNL, timer, liquidation price). The retro pixel art style and thematic elements (Sanity, Heart Rate) should contribute significantly to the immersive experience. The game viewport should scale appropriately to different screen sizes (NFR02).
- **Priorities:** Responsiveness of trading actions and UI elements (NFR01, NFR02), clear display of financial status and game state, immediate visual and potential audio feedback for key events (trades, liquidation, time's up), consistent retro visual style (NFR03).

## System Overview
- **Frontend:** React SPA built with Vite. Uses functional components and hooks for state management and logic. Styling is primarily handled by Tailwind CSS for layout and utility, supplemented by custom CSS for specific pixel art details and animations. Key components are structured around the game flow and UI sections defined in the GDD/PRD.
- **Backend:** Currently frontend-only. The `firebase` dependency exists but is not actively used in the core MVP logic described in the GDD/PRD. Its intended use (e.g., leaderboards, user accounts) is considered a future consideration (Section 5, GDD/PRD) and is out of scope for the MVP.
- **Security:** Minimal requirements for the current frontend-only MVP. Future security needs will depend on the implementation of features like user accounts or persistent data storage (e.g., Firebase Authentication, Firestore security rules).
- **Database:** No persistent database is used in the MVP. Game state (wallet, position, history) is managed in-memory within React component state (`InteractiveTradingPreview.jsx`). Future considerations include a persistent high score or user system, potentially using Firebase (Section 5, GDD/PRD).
- **Infrastructure:** Development uses the Vite dev server (`npm run dev`). Production build is generated via `vite build`. The output is static assets suitable for deployment on static hosting platforms (e.g., Netlify, Vercel, GitHub Pages). No CI/CD or specific deployment infrastructure is defined for the MVP.
- **Other:** Performance is a key non-functional requirement (NFR01), particularly for real-time chart updates and PNL calculations. ESLint is configured for code quality. Formal automated testing (unit, integration) is not explicitly defined as part of the MVP requirements or current setup (Section 5, GDD/PRD). Audio is a future consideration (Section 5, GDD/PRD).

## Constraints
- **Technical:** Browser performance for real-time updates, dependency on chosen libraries (React, Vite, Tailwind).
- **Gameplay:** Fixed 2-minute session timer, mandatory use of 100% wallet balance per trade, liquidation results in game over, only one open position allowed at a time, leverage fixed once position is open.
- **Scope:** Focus is strictly on the MVP features defined in the PRD. Future considerations (sound, more characters/assets, tutorial, leaderboards, refined chart interaction) are explicitly out of scope for the initial version.
- **Budgetary/Timeline:** Not specified in the provided documents.