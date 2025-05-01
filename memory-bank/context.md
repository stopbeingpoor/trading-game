# Project Context

**Last Updated:** 2025-05-01 13:13:00 AEST **Link to Full Kanban Board / Issue Tracker:** [URL_TO_JIRA_TRELLO_GITHUB_PROJECT_ETC]

---

## Current Iteration / Sprint Goal
> [Refine game balance by adjusting volatility impact and price floor.]

## Overall Status Summary
[The Game Design Document (GDD.md) has been made more comprehensive and elegant. The memory bank provides a more complete picture of the project, including detailed implementation logic for the Sanity mechanic. The unused Firebase dependency was removed. The requested background GIF has been applied and darkened on the Access Code, Start Game, and Character Select pages. Character selection and the main game screen now use dynamic character images instead of emojis. Fixed NaN errors in chart rendering. Adjusted PNL calculation to reduce volatility impact. Prevented price from hitting absolute zero. Sanity decrease rules have been adjusted. Fixed character display issue in the game header.]

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
- [x] [BUG-005] Fix character display in GameHeader for 'Nervous Newbie' and 'Full Degen'. - *(Completed: 2025-05-01)*
- [x] [TASK-SANITY-001] Modified Sanity decrease logic in `InteractiveTradingPreview.jsx`: High Leverage/PNL Swing (Leverage > 10, PNL% > 5%, Decrease -0.3) and Closing Losing Position (Decrease -0.5). - *(Completed: 2025-05-01)*
- [x] [TASK-BALANCE-002] Removed Sanity increase conditions from `InteractiveTradingPreview.jsx` as requested. - *(Completed: 2025-05-01)*
- [x] [TASK-UI-009] Refined Heart Rate BPM animation: Adjusted horizontal ECG line height to be less prominent (6px / ~15% of container height). - *(Completed: 2025-05-01)*
- [x] [TASK-UI-008] Modified Heart Rate BPM animation: Removed vertical scanline and increased horizontal ECG line height. - *(Completed: 2025-05-01)*
- [x] [TASK-UI-007] Identified and documented the *full* animation style of the Heart Rate BPM display, including scrolling ECG line, pulsing/glowing icon, pulsing value, and scanline. - *(Completed: 2025-05-01)*
- [x] [TASK-UI-005] Identified and documented the animation style of the Heart Rate BPM display. - *(Completed: 2025-05-01)*
- [x] [TASK-UI-006] Increased the size of the heart icon in the Heart Rate BPM display. - *(Completed: 2025-05-01)*
- [x] [TASK-DOC-001] Analyzed Sanity mechanic implementation in `InteractiveTradingPreview.jsx` and updated `ProjectAndProduct.md` and `DesignAndTech.md` with detailed rules. - *(Completed: 2025-05-01)*
- [x] [BUG-004] Prevent price from hitting absolute zero by clamping at 0.1 in `InteractiveTradingPreview.jsx`. - *(Completed: 2025-05-01)*
- [x] [TASK-BALANCE-001] Reduce `pnlPerPoint` from 10 to 5 to decrease volatility impact. - *(Completed: 2025-05-01)*
- [x] [BUG-003] Fix NaN errors in chart rendering by adding checks in `InteractiveTradingPreview.jsx`. - *(Completed: 2025-05-01)*
- [x] [TASK-UI-004] Enhance profit and loss animations to display P&L amount. - *(Completed: 2025-05-01)*
- [x] [BUG-002] Fix ReferenceError: Cannot access 'setCurrentPrice' before initialization in InteractiveTradingPreview.jsx. - *(Completed: 2025-05-01)*
- [x] [BUG-001] Fix ReferenceError: Cannot access 'updateChart' before initialization in InteractiveTradingPreview.jsx. - *(Completed: 2025-05-01)*
- [x] [TASK-UI-003] Replace character emojis with images in CharacterSelect.jsx and TradingPanel.jsx. - *(Completed: 2025-04-30)*
- [x] [TASK-005] Investigate and remove the usage of the 'firebase' dependency. - *(Completed: 2025-04-30)*
- [x] [TASK-UPDATE-GDD-COMPREHENSIVE] Make Game Design Document more comprehensive and elegant. - *(Completed: 2025-04-30)*
- [x] [TASK-UPDATE-D&T-COMPREHENSIVE] Update memory-bank/DesignAndTech.md with comprehensive frontend details. - *(Completed: 2025-04-30)*
- [x] [TASK-UPDATE-P&P-COMPREHENSIVE] Update memory-bank/ProjectAndProduct.md with comprehensive frontend details. - *(Completed: 2025-04-30)*
- [x] [TASK-READ-ALL-FRONTEND] Read all relevant frontend code files and configuration. - *(Completed: 2025-04-30)*
- [x] [TASK-UPDATE-002] Update memory-bank/DesignAndTech.md based on initial code analysis. - *(Completed: 2025-04-30)*
- [x] [TASK-UPDATE-001] Update memory-bank/ProjectAndProduct.md based on initial code analysis. - *(Completed: 2025-04-30)*
- [x] [TASK-001] Create and populate memory-bank/context.md. - *(Completed: 2025-04-30)*
- [x] [TASK-INIT-002] Create memory-bank/DesignAndTech.md. - *(Completed: 2025-04-30)*
- [x] [TASK-INIT-001] Create memory-bank/ProjectAndProduct.md. - *(Completed: 2025-04-30)*
- [x] [TASK-UI-001] Apply background GIF to Access Code, Start Game, and Character Select pages. - *(Completed: 2025-04-30)*
- [x] [TASK-UI-002] Darken background GIF on Access Code, Start Game, and Character Select pages. - *(Completed: 2025-04-30)*


---

## Key Decisions / Learnings (Recent/Tactical)
- Corrected keys in `characterImages` map within `GameHeader.jsx` to include spaces ('Nervous Newbie', 'Full Degen') matching the names passed from `CharacterSelect.jsx`, resolving the display issue. *(2025-05-01)*
- Modified Sanity decrease rules in `InteractiveTradingPreview.jsx`: High Leverage/PNL Swing now triggers at Leverage > 10 & PNL% > 5% (was >50 & >10%) with a -0.3 decrease (was -0.15); Closing a losing position now causes a -0.5 decrease (was -0.3). *(2025-05-01)*
- Modified Sanity mechanic: Removed conditions for sanity increase (positive PNL, profitable close). Sanity now only decreases or stays the same. *(2025-05-01)*
- Refined Heart Rate BPM animation: Adjusted the height of the horizontal ECG line (`.ecg-line` background-size in `index.css`) to 6px (~15% of container height) to make it less prominent. *(2025-05-01)*
- Modified Heart Rate BPM animation: Removed the vertical background scanline effect (commented out `.heart-rate-monitor::before` in `InteractiveTradingPreview.jsx`) and increased the height of the horizontal ECG line (`.ecg-line` background-size in `index.css`) to half its container height for better visibility. *(2025-05-01)*
- Fully documented the Heart Rate BPM animation style: Combines a scrolling ECG line (`retroEcgScroll` in `index.css`), a scaling pulse (`heartbeat` in `InteractiveTradingPreview.jsx`), an opacity pulse (`ecgPulse` in `index.css`), a text-shadow glow (`InteractiveTradingPreview.jsx`), and a background scanline (`scanline` in `InteractiveTradingPreview.jsx`). *(2025-05-01)*
- Increased the font size of the heart icon in the Heart Rate BPM display to `1.5em` in `InteractiveTradingPreview.jsx` to make it slightly larger. *(2025-05-01)*
- Documented specific Sanity mechanic rules: Decreases on position open (character-based), significant negative PNL, high leverage swings, losing close, liquidation. Reaching 0 triggers game over. *(2025-05-01)*
- Clamped price, candle lows, and liquidation price at 0.1 instead of 0 in `InteractiveTradingPreview.jsx` to prevent the price hitting absolute zero. *(2025-05-01)*
- Reduced `pnlPerPoint` from 10 to 5 in `InteractiveTradingPreview.jsx` to decrease the financial impact of price volatility and reduce liquidation frequency. *(2025-05-01)*
- Added checks in `updateChart` within `InteractiveTradingPreview.jsx` to prevent `NaN` values in `lastCandle.close` or `currentATR` from propagating into new candle data. *(2025-05-01)*
- Added P&L amount display to both the green (profit) and red (loss) screen flash animations when a user closes a position, using CSS animations and component props, and ensured the correct P&L value is passed during the animation. *(2025-05-01)*
- Resolved 'setCurrentPrice' initialization error by moving useState declarations before the useCallback hook that uses them in InteractiveTradingPreview.jsx. *(2025-05-01)*
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