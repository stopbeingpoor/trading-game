# Technical Design & Decisions: Trading Game

**Last Updated:** 2025-05-01 13:07:30 AEST ---

## 1. System Architecture

### 1.1. Overview & High-Level Diagram
[The system is a single-page web application built with React and styled using Tailwind CSS and custom CSS. It communicates with a Supabase backend via the `@supabase/supabase-js` client library, utilizing Supabase Auth for user management, Supabase Database (PostgreSQL) for data persistence, and Supabase Edge Functions for server-side logic like access code verification. The trading chart is rendered using SVG.]

```mermaid
graph TD
    User --> FE[Frontend (React SPA)];
    FE --> Supabase[Supabase Client Library];
    Supabase --> |Auth| SupabaseAuth[Supabase Auth];
    Supabase --> |Database| SupabaseDB[Supabase Database (PostgreSQL)];
    Supabase --> |Edge Functions| SupabaseFunctions[Supabase Edge Functions];
```
*[Link to Detailed Architecture Diagram (if applicable)]*

### 1.2. Architectural Style & Patterns
* **Style:** [Client-Server with BaaS (Backend as a Service)]
* **Key Patterns:** [Component-based UI (React), Data Fetching and Realtime Subscriptions via Supabase Client, Serverless Functions (Supabase Edge Functions) for specific tasks, Utility-first CSS (Tailwind CSS), Custom CSS for pixel art styling and animations.]

### 1.3. Component Breakdown
* **Frontend:** [A React SPA responsible for rendering the user interface, managing client-side state, handling user interactions, and interacting with the Supabase backend via the `@supabase/supabase-js` client library.]
* **Supabase Auth:** [Manages user authentication (sign-up, login, sessions) for the application.]
* **Supabase Database:** [A PostgreSQL database used to persist application data, including user profiles, portfolios, and potentially simulated stock data. Row Level Security (RLS) is intended for access control.]
* **Supabase Edge Functions:** [Deno-based serverless functions used for specific backend tasks, such as the `verify-access-code` function.]

### 1.4. API Design Principles
* **Style:** [Interaction primarily through the `@supabase/supabase-js` client library for database and auth operations, and explicit HTTP calls to Supabase Edge Functions.]
* **Data Format:** [JSON for data exchange.]
* **Authentication:** [JSON Web Tokens (JWT) managed by Supabase Auth for securing API access.]
* **Versioning:** [Managed implicitly by Supabase client library versions; Edge Functions can be versioned independently.]
* **Specification:** [Supabase documentation for client library usage, source code for Edge Functions.]

### 1.5. Data Model & Schema
* **Key Entities:** [users (Supabase Auth), profiles, portfolios, stocks (simulated)]
* **Relationships:** [One-to-one between users and profiles/portfolios.]
* **Schema Definition:** [Defined via Supabase migrations or UI.]

### 1.6. Directory Structure
```
/
├── src/             # Frontend React code
│   ├── components/
│   ├── assets/
│   ├── supabaseClient.js # Supabase client initialization
│   └── ...
├── supabase/        # Supabase related files
│   ├── functions/   # Edge Functions
│   └── migrations/  # Database migrations
├── memory-bank/     # Project documentation
└── ...
```

---

## 2. Technology Stack & Rationale
* **Languages:** [JavaScript/TypeScript (Frontend, Edge Functions), SQL (Supabase Database)] - *Rationale:* [Standard web development languages, native to Supabase environment.]
* **Frontend Framework:** [React] - *Rationale:* [A widely-used library for building dynamic user interfaces.]
* **Styling:** [Tailwind CSS, Custom CSS] - *Rationale:* [Tailwind for rapid utility-first styling, custom CSS for pixel art aesthetics and animations.]
* **Databases:** [PostgreSQL (via Supabase)] - *Rationale:* [A powerful, open-source relational database provided as part of the Supabase platform.]
* **Infrastructure:** [Supabase (Auth, Database, Edge Functions)] - *Rationale:* [Provides a comprehensive suite of backend services required for the application.]
* **Key Libraries:** [@supabase/supabase-js, React, react-dom] - *Rationale:* [Official Supabase client library, core React libraries for building UIs.]
* **Other Dependencies:** [Firebase is listed in `package.json` but its current use in the project is not evident from the examined files.]

---

## 3. Key Design Patterns & Conventions

### 3.1. Software Design Patterns
* [Component-based architecture (React).]
* [Using Supabase client for data access.]

### 3.2. Coding Style Guides
* **Frontend:** [Standard React/JavaScript practices, potentially ESLint/Prettier.]

---

## 4. Significant Technical Decisions (Log)
### Decision: Use Supabase as Backend
* **Date:** 2025-04-30
* **Status:** Accepted
* **Context:** Need a backend for authentication, database, and serverless functions for a web game.
* **Decision:** Use Supabase.
* **Rationale:** Provides integrated Auth, PostgreSQL database, and Edge Functions, simplifying development.
* **Consequences:** Reliance on Supabase platform, potential vendor lock-in.

---

## 5. Development & Operations

### 5.1. Development Environment Setup
* **Prerequisites:** [Node.js, npm/yarn, Supabase CLI (for local development and deploying Edge Functions).]
* **Setup Steps:**
    1.  Clone the repository: `git clone [repo_url]`
    2.  Navigate to the project directory: `cd trading-game`
    3.  Install dependencies: `npm install`
    4.  Configure Supabase environment variables: Create a `.env` file in the project root with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
    5.  (Optional) Set up Supabase locally using the Supabase CLI or connect to a remote Supabase project.
* **Run Commands:**
    * Start the frontend development server: `npm run dev` (Uses Vite)
    * Deploy Supabase Edge Functions: `supabase functions deploy` (from the `supabase` directory)

### 5.2. Dependency Management
* **Tools:** [npm]
* **Process:** [Use `package-lock.json`. Update dependencies as needed.]
* **Manifests:** `package.json`

### 5.3. Environment Configuration
* **Method:** [Environment variables, typically loaded from a `.env` file in development and configured in the hosting environment (e.g., Vercel, Netlify) for production.]
* **Key Variables:** [`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`]

### 5.4. Tooling & Workflows
* **Build Tool:** [Vite] - *Rationale:* [Fast development server and build tool for modern JavaScript projects.]
* **Linters/Formatters:** [ESLint, Prettier (based on project files)]

### 5.5. CI/CD Pipeline
* **Provider:** [Not yet defined.]
* **Definition:** [Not yet defined.]
* **Stages:** [Not yet defined.]

### 5.6. Deployment & Rollback
* **Deployment:** [Likely static hosting for frontend (e.g., Vercel, Netlify), Supabase handles backend.]
* **Rollback:** [Frontend: Revert to previous commit/build. Supabase: Database backups/migrations.]

---

## 6. Quality Assurance & Cross-Cutting Concerns

### 6.1. Styling Approach
* **Methodology:** [Utility-first (Tailwind CSS) combined with custom CSS for specific components and visual effects.]
* **Theme:** [Retro pixel art, implemented with CSS variables for color palette and custom styles for borders, containers, fonts, and elements.]
* **Fonts:** [Integration of 'Press Start 2P' and 'VT323' Google Fonts for the pixel art aesthetic.]
* **Animations:** [Extensive use of CSS keyframe animations for UI elements, trader status indicators (heart rate, sanity), and game event overlays (profit, loss, liquidation).]

### 6.2. Chart Implementation
* **Technology:** [Scalable Vector Graphics (SVG) is used to render the trading chart.]
* **Features:** [Displays candlestick data, entry price line, supports zooming, panning, and scrolling.]
* **Styling:** [Custom CSS is used to style the SVG elements, including candlestick colors and grid lines, consistent with the pixel art theme.]

### 6.3. Testing Strategy
* **Unit Tests:** [Not yet defined.]
* **Integration Tests:** [Not yet defined.]
* **End-to-End (E2E) Tests:** [Not yet defined.]

### 6.4. Security Design Principles
* **Authentication:** [User authentication is handled by Supabase Auth, utilizing JWTs.]
* **Authorization:** [Access control to database data is managed using Row Level Security (RLS) policies in the Supabase Database.]
* **Data Protection:** [Supabase provides built-in security features for the database and authentication.]

### 6.5. Performance Strategy
* **Monitoring:** [Supabase provides some monitoring.]
* **Caching:** [Client-side caching where appropriate.]

### 6.6. Monitoring & Logging
* **Monitoring:** [Supabase dashboard.]
* **Logging:** [Supabase logs, console logs in frontend/Edge Functions.]

### 6.1. Testing Strategy
* **Unit Tests:** [Not yet defined.]
* **Integration Tests:** [Not yet defined.]
* **End-to-End (E2E) Tests:** [Not yet defined.]

### 6.2. Security Design Principles
* **Authentication:** [User authentication is handled by Supabase Auth, utilizing JWTs.]
* **Authorization:** [Access control to database data is managed using Row Level Security (RLS) policies in the Supabase Database.]
* **Data Protection:** [Supabase provides built-in security features for the database and authentication.]

### 6.3. Performance Strategy
* **Monitoring:** [Supabase provides some monitoring.]
* **Caching:** [Client-side caching where appropriate.]

### 6.4. Monitoring & Logging
* **Monitoring:** [Supabase dashboard.]
* **Logging:** [Supabase logs, console logs in frontend/Edge Functions.]

### 6.7. Game Mechanics Implementation
*   **Location:** Core game logic, including PNL calculation, trader status (sanity, heart rate, emotion), and position management, is primarily handled within the `InteractiveTradingPreview.jsx` component using React's `useState` and `useCallback` hooks.
*   **Sanity Mechanic (`sanity` state):**
    *   **Initial Value:** 8.
    *   **Updates:** The `setSanity` state setter is called within various handler functions (`handleBuy`, `handleSell`, `handleClose`, `handleLiquidation`) and the `updatePnl` callback.
    *   **Decrease Logic:**
        *   Opening Position: -1 (Stoic), -1.5 (Nervous Newbie), -2 (Full Degen).
        *   Negative PNL (Real-time): -0.1 (Stressed: PNL < -20% margin), -0.2 (Panicked: PNL < -50% margin).
        *   High Leverage + PNL Swing: Triggers if `leverage > 10` AND `abs(PNL %) > 5%`, causing a `-0.3` sanity change.
        *   Closing Losing Position: Causes a `-0.5` sanity change.
        *   Liquidation: -1.5.
    *   **Increase Logic:** (None - Sanity only decreases or stays the same as per code changes on 2025-05-01).
    *   **Game Over:** Triggered immediately if sanity reaches 0. Check implemented within `handleBuy`/`handleSell` after decrement.
    *   **Precision:** Values are rounded to one decimal place using `Math.round(... * 10) / 10`.
*   **Heart Rate (`heartRate` state):**
    *   Calculated based on base rate, PNL percentage relative to margin, leverage, and whether a position is open. Clamped between 60-200 BPM. Logic in `updatePnl`.
*   **Emotion (`emotion` state):**
    *   Determined by PNL percentage relative to margin and high leverage/PNL swing conditions. States include neutral, happy, stressed, panicked, excited, euphoric, insane. Logic in `updatePnl`.