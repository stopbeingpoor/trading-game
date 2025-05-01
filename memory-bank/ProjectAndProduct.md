# Project & Product Definition: Trading Game

**Last Updated:** 2025-05-01 13:07:00 AEST ---

## PART 1: Project Foundation

### 1.1. Goals & Objectives
> [To create a web-based trading simulation game.]

* **Specific Objectives:**
    * [Allow users to simulate stock trading.]
    * [Provide real-time or near-real-time chart data.]
    * [Implement user authentication and access control using Supabase Auth.]
    * [Track user performance and game state in Supabase Database.]
* **Success Metrics:**
    * [Number of active users.]
    * [User engagement time.]
    * [Accuracy of trading simulations.]

### 1.2. Problem Statement
**Problem:** [Users need a platform to practice stock trading strategies in a risk-free environment.]
**Target Audience:** [Individuals interested in learning about stock trading, students, casual gamers.]
**User Needs:** [Realistic trading simulation, access to market data, performance tracking, easy-to-use interface.]

### 1.3. Scope
#### In Scope:
* [User registration and login.]
* [Simulated buying and selling of stocks.]
* [Display of stock charts and data.]
* [User portfolio tracking.]
* [Access code verification for game entry using Supabase Edge Functions.]
#### Out of Scope:
* [Real-money trading.]
* [Integration with external financial APIs for live data (initially).]
* [Advanced trading features (options, futures, etc.).]
* [Multiplayer features.]

### 1.4. Key Assumptions
* [Users have basic internet access.]
* [Simulated market data is sufficient for practice.]
* [Supabase is used for backend services (Auth, Database, Edge Functions).]
* [Firebase is present in dependencies but its usage is currently unclear.]

### 1.5. Constraints
* **Technical:** [Must be a web application.]
* **Resource:** [Limited development team.]
* **Time:** [Initial version delivery timeline.]
* **Regulatory:** [Must comply with relevant data privacy laws.]

---

## PART 2: Product Definition

### 2.1. Product Vision
> [To be the leading platform for accessible and engaging stock trading simulation, presented with a distinctive retro pixel art aesthetic.]

### 2.2. User Experience (UX) Goals
* **Overall:** [Intuitive, engaging, informative, and visually distinctive with a consistent pixel art theme.]
* **Principles:**
    * [Clarity: Trading actions and market data should be easy to understand, presented with clear pixelated visuals.]
    * [Efficiency: Quick access to trading features and responsive chart interactions.]
    * [Consistency: Predictable interface elements and visual styling across all screens.]
    * [Engagement: Use visual feedback and trader status elements to enhance user immersion.]
    * [Accessibility: Basic accessibility standards, ensuring readability of pixel fonts.]

### 2.3. Target Audience / User Personas
* **Persona 1:** [Beginner Trader (Needs simple interface, basic data).]
* **Persona 2:** [Student (Needs educational tool, performance tracking).]

### 2.4. Features & Requirements
#### Feature/Epic: User Authentication
* **Description:** Handles user authentication via Supabase Auth and initial game access via Supabase Edge Function access code verification.
* **User Stories:**
    * As a new user, I want to enter a valid access code to gain initial access to the game.
    * As a registered user, I want to log in securely using Supabase Auth.
* **Acceptance Criteria:**
    * [Entering a valid access code successfully invokes the 'verify-access-code' Edge Function and grants access.]
    * [Users can successfully authenticate via Supabase Auth.]
* **Designs/Mocks:** [Link if available]

#### Feature/Epic: Trading Simulation
* **Description:** Allows users to buy and sell simulated stocks.
* **User Stories:**
    * As a user, I want to view stock charts...
    * As a user, I want to buy shares of a stock...
    * As a user, I want to sell shares of a stock...
* **Acceptance Criteria:**
    * [Charts display historical data.]
    * [Buy/sell actions update portfolio and cash balance.]
* **Designs/Mocks:** [Link if available]

#### Feature/Epic: Portfolio Management
* **Description:** Tracks user's stock holdings and cash balance.
* **User Stories:**
    * As a user, I want to see my current stock holdings...
    * As a user, I want to see my current cash balance...
* **Acceptance Criteria:**
    * [Portfolio accurately reflects buy/sell actions.]
    * [Cash balance updates correctly.]
* **Designs/Mocks:** [Link if available]

#### Feature/Epic: Trader Status & Feedback
* **Description:** Manages and displays dynamic feedback to the player based on their actions and performance, including Sanity and Heart Rate.
* **Components:** `GameHeader.jsx`, `TradingPanel.jsx`
* **Sanity Meter:**
    * **Purpose:** Represents the trader's mental state/risk tolerance (Max 8 points). Reaching 0 triggers game over.
    * **Initial State:** 8 points.
    * **Decrease Conditions:**
        *   Opening Position (Buy/Sell): Varies by character: Stoic (-1), Nervous Newbie (-1.5), Full Degen (-2).
        *   Significant Negative PNL (Real-time): Stressed state (PNL < -20% margin): -0.1; Panicked state (PNL < -50% margin): -0.2.
        *   High Leverage + PNL Swing: Triggers if `leverage > 10` AND `abs(PNL %) > 5%`, causing a `-0.3` sanity change.
        *   Closing Losing Position: Causes a `-0.5` sanity change.
        *   Liquidation: -1.5.
    * **Increase Conditions:** (None - Sanity only decreases or stays the same)
    * **Implementation:** Logic resides in `InteractiveTradingPreview.jsx`, displayed in `GameHeader.jsx`. Values rounded to one decimal place.
* **Heart Rate (BPM):**
    * **Purpose:** Reflects trader stress/excitement.
    * **Influences:** Increases when opening positions, during significant PNL swings (positive/negative), and with higher leverage. Decreases slightly after closing profitable trades or returning to neutral emotion.
    * **Implementation:** Logic in `InteractiveTradingPreview.jsx`, displayed in `TradingPanel.jsx`.
    * **Animation Style:** Multi-layered effect combining:
        *   Scrolling horizontal ECG line (`retroEcgScroll` animation in `index.css`). Line height adjusted to 6px (~15% of container height). Speed and color change based on BPM.
        *   Pulsing heart icon (scale) (`heartbeat` animation in `InteractiveTradingPreview.jsx`).
        *   Pulsing heart icon & BPM value (opacity) (`ecgPulse` animation in `index.css`).
        *   Glowing heart icon (`text-shadow` in `InteractiveTradingPreview.jsx`).
        *   ~~Vertical background scanline (`scanline` animation in `InteractiveTradingPreview.jsx`)~~ (Removed).
* **Trader Emotion:**
    * **Purpose:** Visual feedback via emoji reflecting current state.
    * **States:** Neutral, Happy, Stressed, Panicked, Excited, Euphoric, Insane.
    * **Triggers:** Based on PNL percentage relative to initial margin, high leverage swings.
    * **Implementation:** Logic in `InteractiveTradingPreview.jsx`, displayed in `TradingPanel.jsx`.

### 2.5. Non-Functional Requirements (Product View)
* **Usability:** [Core trading actions are easily discoverable.]
* **Performance:** [Charts load quickly.]
* **Reliability:** [Game state is saved and loaded correctly.]
* **Security:** [User data and access codes are protected.]

### 2.6. Future Considerations / Roadmap
* [V2: Integrate with a real-time data source.]
* [V2: Add more complex order types (limit, stop-loss).]
* [V3: Implement social features (leaderboards).]

### 2.7. UI Components
* **AccessCodeVerification:** Handles the initial access code input and verification.
* **AnimationOverlays:** Displays visual animations for profit, loss, and liquidation.
* **CharacterSelect:** Allows the user to choose a trader character.
* **ChartDisplay:** Renders the trading price chart and related information.
* **FullscreenButton:** (Not yet examined, but present in file list - likely for toggling fullscreen mode).
* **GameHeader:** Displays key game stats (wallet, total PNL, time, sanity).
* **GameOver:** Shows the game results and trade history after the game ends.
* **GameViewportScaler:** (Not yet examined, but present in file list - likely for scaling the game to the viewport).
* **InteractiveTradingPreview:** The main component managing game logic, state, and rendering other components.
* **TradingActions:** Contains the Buy, Sell, and Close buttons.
* **TradingPanel:** Displays trading settings (leverage) and trader status (heart rate, emotion).

### 2.8. Visual Theme
* **Style:** Retro pixel art theme.
* **Fonts:** Uses 'Press Start 2P' and 'VT323' Google Fonts.
* **Color Palette:** Defined using CSS variables with a limited, vibrant pixel art color scheme.
* **Elements:** Custom styling for containers, buttons, tables, and other elements to fit the pixel art aesthetic.
* **Animations:** CSS keyframe animations for visual feedback and dynamic elements.

### 2.9. Glossary / Terminology
* **Stock:** [A unit of ownership in a company.]
* **Portfolio:** [A collection of investments owned by an individual.]
* **Access Code:** [A code required to enter the game.]
* **PNL (Profit and Loss):** [The gain or loss on a trading position.]
* **Leverage:** [Using borrowed funds to increase trading position size.]
* **Liquidation:** [The forced closing of a leveraged position due to insufficient margin.]
* **Sanity:** [A game mechanic representing the trader's mental state (max 8 points). Decreases based on: opening positions (character-dependent), negative PNL (Stressed/Panicked states), high leverage (>10) combined with significant PNL swings (>5%), closing losing positions (-0.5), and liquidation (-1.5). Sanity does not increase during gameplay. Reaching 0 triggers game over. Implemented in `InteractiveTradingPreview.jsx`.]
* **BPM (Beats Per Minute):** [Represents the trader's heart rate, reflecting excitement or stress.]


