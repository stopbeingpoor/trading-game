# Project Context

**Last Updated:** 2025-05-01 02:37:00 AM AEST **Link to Full Kanban Board / Issue Tracker:** [URL_TO_JIRA_TRELLO_GITHUB_PROJECT_ETC]

---

## Current Iteration / Sprint Goal
> [Enhance project documentation by making the Game Design Document more comprehensive and elegant.]

## Overall Status Summary
[The Game Design Document (GDD.md) has been made more comprehensive and elegant. The memory bank provides a more complete picture of the project. The unused Firebase dependency was removed. The requested background GIF has been applied and darkened on the Access Code, Start Game, and Character Select pages. Character selection and the main game screen now use dynamic character images instead of emojis.]

---

## Key Blockers / Impediments
- [ ] [BLOCKER-002] The functionality of `FullscreenButton.jsx` and `GameViewportScaler.jsx` has not been fully documented as their code was not read. - *(Impacts: Complete understanding of UI layout and scaling)*

---

## Current Focus (In Progress)
- [ ] [TASK-003] Begin implementing user authentication with Supabase. - *(Status: To Do)*

## Up Next (To Do)
1.  [ ] [TASK-006] Read and document the functionality of `FullscreenButton.jsx` and `GameViewportScaler.jsx`.
2.  [ ] [TASK-007] Explore Supabase-specific files (e.g., Edge Functions code, migration files) to gather more detailed backend information for the memory bank.

## Recently Completed (Done)
- [x] [TASK-UI-002] Darken background GIF on Access Code, Start Game, and Character Select pages. - *(Completed: 2025-04-30)*
- [x] [TASK-UI-001] Apply background GIF to Access Code, Start Game, and Character Select pages. - *(Completed: 2025-04-30)*
- [x] [TASK-INIT-001] Create memory-bank/ProjectAndProduct.md. - *(Completed: 2025-04-30)*
- [x] [TASK-INIT-002] Create memory-bank/DesignAndTech.md. - *(Completed: 2025-04-30)*
- [x] [TASK-001] Create and populate memory-bank/context.md. - *(Completed: 2025-04-30)*
- [x] [TASK-UPDATE-001] Update memory-bank/ProjectAndProduct.md based on initial code analysis. - *(Completed: 2025-04-30)*
- [x] [TASK-UPDATE-002] Update memory-bank/DesignAndTech.md based on initial code analysis. - *(Completed: 2025-04-30)*
- [x] [TASK-READ-ALL-FRONTEND] Read all relevant frontend code files and configuration. - *(Completed: 2025-04-30)*
- [x] [TASK-UPDATE-P&P-COMPREHENSIVE] Update memory-bank/ProjectAndProduct.md with comprehensive frontend details. - *(Completed: 2025-04-30)*
- [x] [TASK-UPDATE-D&T-COMPREHENSIVE] Update memory-bank/DesignAndTech.md with comprehensive frontend details. - *(Completed: 2025-04-30)*
- [x] [TASK-UPDATE-GDD-COMPREHENSIVE] Make Game Design Document more comprehensive and elegant. - *(Completed: 2025-04-30)*
- [x] [TASK-005] Investigate and remove the usage of the 'firebase' dependency. - *(Completed: 2025-04-30)*
- [x] [TASK-UI-003] Replace character emojis with images in CharacterSelect.jsx and TradingPanel.jsx. - *(Completed: 2025-04-30)*
- [x] [BUG-001] Fix ReferenceError: Cannot access 'updateChart' before initialization in InteractiveTradingPreview.jsx. - *(Completed: 2025-05-01)*
- [x] [BUG-002] Fix ReferenceError: Cannot access 'setCurrentPrice' before initialization in InteractiveTradingPreview.jsx. - *(Completed: 2025-05-01)*
- [x] [TASK-UI-004] Enhance profit and loss animations to display P&L amount. - *(Completed: 2025-05-01)*

---

## Key Decisions / Learnings (Recent/Tactical)
- Replaced static emojis with dynamic character images in CharacterSelect.jsx and TradingPanel.jsx for improved visual representation. *(2025-04-30)*
- Added a semi-transparent black overlay div to the background containers to darken the background GIF as requested by the user. *(2025-04-30)*
- Applied background GIF using inline styles and Tailwind CSS to relevant page components (`App.jsx`, `AccessCodeVerification.jsx`, `CharacterSelect.jsx`). *(2025-04-30)*
- Decided to use Supabase for backend services to accelerate development. *(2025-04-30)*
- Confirmed use of React, Supabase client, and Supabase Edge Functions for access code verification. *(2025-04-30)*
- Noted the presence of an unexplained 'firebase' dependency. *(2025-04-30)*
- Identified key UI components and their roles in the application flow. *(2025-04-30)*
- Documented the retro pixel art visual theme and styling approach. *(2025-04-30)*
- Understood the basic structure and interaction of frontend components. *(2025-04-30)*
- Successfully updated GDD.md with detailed gameplay, UI, art, and technical information. *(2025-04-30)*
- Removed the unused 'firebase' dependency from the project. *(2025-04-30)*
- Resolved 'setCurrentPrice' initialization error by moving useState declarations before the useCallback hook that uses them in InteractiveTradingPreview.jsx. *(2025-05-01)*
- Added P&L amount display to both the green (profit) and red (loss) screen flash animations when a user closes a position, using CSS animations and component props, and ensured the correct P&L value is passed during the animation. *(2025-05-01)*