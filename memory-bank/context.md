# Project Context

## Summary
- **Current State:** The project is a React-based frontend MVP of the "Stop Being Poor" trading simulation game, built with Vite and styled using Tailwind CSS. The core game flow (Start -> Character Select -> Trading -> Game Over) and main UI components are defined in the codebase and detailed in the GDD/PRD. The `firebase` dependency is present but not utilized within the MVP scope.
- **Date:** 2025-04-30

## Frontend
- **Current Focus:** Implementing the core game mechanics and UI components as specified in the GDD and PRD. This includes the real-time chart simulation, PNL calculation, leverage application, liquidation logic, timer, Sanity Meter, Heart Rate, and the various screens and panels.
- **Recent Changes:** Memory Bank updated with detailed information from `Project Documentation/GDD.md` and `Project Documentation/PRD.md` (2025-04-30).
- **Known Issues:** The actual implementation of the complex game mechanics (chart data generation/simulation, precise PNL/liquidation calculation logic, Sanity/Heart Rate dynamics) within the React components is the primary remaining task for the MVP. Integration of the `firebase` dependency is not defined for the MVP.
- **Patterns & Decisions:** Continued use of React functional components and hooks. Component structure follows the UI breakdown in the GDD/PRD. Styling via Tailwind CSS and custom CSS for retro effects. State management is handled locally within components, particularly `InteractiveTradingPreview.jsx`. Viewport scaling is managed by `GameViewportScaler`.
- **Next Steps:**
    1.  Implement the real-time candlestick chart data simulation and rendering logic in `ChartDisplay.jsx`.
    2.  Develop the core trading logic in `InteractiveTradingPreview.jsx`, including handling BUY/SELL/CLOSE actions, calculating real-time PNL, applying leverage, and managing the wallet balance.
    3.  Implement the liquidation mechanic.
    4.  Implement the game timer.
    5.  Develop the logic for the Sanity Meter and Heart Rate based on game events and state.
    6.  Complete the `GameOver.jsx` component to display final results and trade history.
    7.  Ensure all functional requirements (FRs) from the PRD are met.
    8.  Address non-functional requirements (NFRs) related to performance and usability.

## Backend
- **Current Focus:** N/A (Confirmed as frontend-only for MVP).
- **Recent Changes:** N/A.
- **Known Issues:** No backend services are implemented. The purpose and integration plan for the `firebase` dependency are undefined within the MVP scope.
- **Patterns & Decisions:** Decision to keep MVP frontend-only. Firebase is noted as a potential future BaaS.
- **Next Steps:** If future features (like leaderboards or user accounts) require a backend, define requirements and plan implementation (potentially using Firebase as noted in future considerations).

## Security
- **Current Focus:** N/A (Minimal requirements for frontend-only MVP).
- **Recent Changes:** N/A.
- **Known Issues:** Security requirements and implementation will be necessary if backend features involving user data or persistent state are added (e.g., authentication, database access control).
- **Patterns & Decisions:** N/A.
- **Next Steps:** Define and implement security measures if backend/database features are added in the future.

## Database
- **Current Focus:** N/A (Game state is in-memory).
- **Recent Changes:** N/A.
- **Known Issues:** No persistent database is used for the MVP. Game state is lost upon page refresh or game restart.
- **Patterns & Decisions:** Game state managed within React component state. Persistent storage is a future consideration.
- **Next Steps:** If persistent features (like high scores) are added, select and implement a database solution (e.g., Firebase Firestore/Realtime Database).

## Infrastructure
- **Current Focus:** Utilizing Vite for the development server and build process.
- **Recent Changes:** N/A.
- **Known Issues:** No formal CI/CD pipeline or automated deployment process is configured.
- **Patterns & Decisions:** Vite is used for its fast development server and efficient builds. Output is static, suitable for simple hosting.
- **Next Steps:** Set up a CI/CD pipeline (e.g., using GitHub Actions as the project is likely in a Git repository) to automate builds and deployments to a chosen static hosting provider (e.g., Netlify, Vercel).

## Other
- **Current Focus:** Reviewing GDD/PRD for overall game design and requirements.
- **Recent Changes:** Detailed game mechanics, UI elements, and functional/non-functional requirements documented in Memory Bank based on GDD/PRD (2025-04-30).
- **Known Issues:** Automated testing infrastructure is not set up. Audio implementation is a future consideration.
- **Patterns & Decisions:** ESLint is used for code linting.
- **Next Steps:** Configure and implement automated tests (unit, integration) to ensure code quality and verify functional requirements. Consider implementing audio as a future enhancement. Refine chart interaction based on GDD future considerations.