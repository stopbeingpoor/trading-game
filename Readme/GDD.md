# Game Design Document: Stop Being Poor

## 1. Introduction

*   **Game Title:** Stop Being Poor
*   **Concept:** A fast-paced, high-stakes trading simulation game with emotional feedback mechanics, challenging players to manage risk and emotion under pressure.
*   **Genre:** Simulation, Arcade Trading
*   **Target Audience:** Casual gamers interested in trading concepts, players enjoying high-risk/reward mechanics, fans of retro aesthetics.
*   **Theme:** Retro pixel art, high-energy, slightly stressful trading environment with a neon green and black color palette.

## 2. Gameplay

*   **Core Loop:**
    1.  **Start Screen:** Player initiates the game.
    2.  **Character Selection:** Player chooses a trader persona.
    3.  **Trading Phase:** Player actively manages trades within a time limit, reacting to price changes and managing leverage.
    4.  **Game Over Screen:** Game ends due to time running out or liquidation. Results are displayed.
    5.  **Restart:** Player can choose to play again, returning to Character Selection.
*   **Mechanics:**
    *   **Trading:** Players can open a position by clicking "BUY/LONG" or "SELL/SHORT". Only one position can be open at a time. The entry price is the price at the moment the button is clicked.
    *   **Leverage:** Players select a leverage multiplier (1x to 1000x) *before* opening a position using a slider. This multiplier scales both potential profits and losses relative to the position size. The leverage cannot be changed while a position is open.
    *   **Position Size:** The entire current wallet balance is automatically used as the margin for the trade when a position is opened.
    *   **PNL (Profit and Loss):** Calculated in real-time for open positions based on: `(Current Price - Entry Price) / Entry Price * Wallet Balance at Entry * Leverage`. The sign is flipped for SHORT positions. PNL directly impacts the displayed Wallet Balance in real-time.
    *   **Wallet Balance:** Starts at $10,000. While a position is open, the displayed balance fluctuates based on `Initial Wallet Balance + Current PNL`. When a position is closed, the final PNL is added/subtracted from the balance.
    *   **Liquidation:** If the negative PNL of an open position becomes equal to or exceeds the `Wallet Balance at Entry`, the position is automatically closed, the player loses the entire `Wallet Balance at Entry`, the wallet is set to $0, and the game ends immediately. This represents a margin call where losses consume the entire allocated margin.
    *   **Sanity Meter:** A visual meter (0-8 points) representing the trader's mental state. It decreases based on realized losses, high leverage usage, and potentially high PNL volatility. Low sanity primarily affects the trader's visual representation (emoji/animation).
    *   **Heart Rate (BPM):** A visual indicator reflecting the trader's stress level. It increases when opening positions, during high PNL swings (positive or negative), and with higher leverage. It primarily affects the trader status display.
    *   **Game Timer:** The trading phase lasts for a fixed duration of 120 seconds. When the timer reaches zero, the game ends, any open position is automatically closed, and the final results are displayed.
*   **Controls:**
    *   **Buttons:** "START GAME", Character Selection buttons, "BUY/LONG", "SELL/SHORT", "CLOSE", "PLAY AGAIN". Buy/Sell/Close buttons have disabled states based on whether a position is open and which type.
    *   **Slider:** Used to adjust Leverage (1x-1000x). Disabled when a position is open.
    *   **Chart Interaction:** Mouse wheel for scrolling through time, mouse drag (TBD - right-click drag planned) for panning, dedicated buttons for zoom (+/-) and navigation (← Past / → Present).

## 3. Game Flow

```mermaid
graph TD
    A[Start Screen] -->|Click START GAME| B(Character Select);
    B -->|Select Character| C(Trading Phase);
    C -->|Timer Runs Out| D{Game Over};
    C -->|Current PNL <= -Wallet Balance at Entry (Liquidation)| D;
    D -->|Click PLAY AGAIN| B;
```

## 4. User Interface (UI)

*   **Overall Style:** Retro pixel art aesthetic using the 'Press Start 2P' font. Dominant colors are black and neon green (`#00ff00`). UI elements like buttons and containers have distinct pixelated borders. The game view is scaled to fit the viewport via `GameViewportScaler`.
*   **Start Screen:** Minimalist screen with the game title "STOP BEING POOR" prominently displayed and a "START GAME" button.
*   **Character Select Screen:** Displays the title "SELECT YOUR TRADER". Presents available characters (currently Stoic 😐, Nervous Newbie 😰, Full Degen 🤪) in a grid format, each with their emoji and name, acting as selection buttons.
*   **Trading Screen (Main Gameplay):** Divided into key areas:
    *   `GameHeader` (Top): Shows selected character emoji/name, current Wallet Balance (e.g., "$9,876"), Total Session PNL (e.g., "+$1,234" in green or "-$567" in red), Remaining Time (e.g., "1:45"), and the Sanity Meter (🧠 icon, "X/8" value, segmented bar visually representing sanity level with color changes).
    *   `ChartDisplay` (Main Area - Left/Center): Renders the candlestick chart based on `visibleRange` of `chartData`. Includes a Price/Position Info Bar above the chart showing Current Price, and if a position is open: Type (LONG/SHORT), Entry Price, Size (Initial Wallet), Leverage (@X), Margin (Initial Wallet), Real-time PNL (color-coded), and Liquidation Price (in red). Visualizes Entry Price (dashed green/red line) and Liquidation Price (dashed red line) on the chart when active. Contains chart navigation/zoom controls.
    *   `TradingPanel` (Side Area - Right): Contains "TRADING SETTINGS" with non-editable Position Size display (reflecting current wallet) and the interactive Leverage slider (1x-1000x, disabled when position open). Also contains "TRADER STATUS" showing the animated Heart Rate Monitor (BPM value, ECG line) and the dynamic Trader Emotion Emoji display within a bordered box.
    *   `TradingActions` (Bottom): Displays a summary bar (Leverage setting, Trade Count, Total Session PNL). Provides the core action buttons: "BUY/LONG" (green), "SELL/SHORT" (red), "CLOSE" (grey/white), with appropriate disabled states.
*   **Game Over Screen:** Displays a large title: "LIQUIDATED!" (in red) or "TIME'S UP!". Shows Final Wallet Balance and Total Session PNL. If liquidated, a specific box details the liquidated position (Type, Entry, Liquidation Price, Leverage). Includes a scrollable Trade History table (listing Type and PNL for each trade). Provides a "PLAY AGAIN" button.
*   **Animation Overlays (`AnimationOverlays.jsx`):** Provides non-intrusive visual feedback overlays: a brief green flash on profit, red flash on loss, and a more intense screen shake with red flash upon liquidation.

## 5. Art & Audio

*   **Visuals:** Consistent retro pixel art. Neon green (`#00ff00`) is the primary accent color against black backgrounds. Red (`#ff3333`) is used for negative PNL, short positions, and warnings. Yellow/Orange used for intermediate warning states (sanity). Key UI elements (buttons, containers) have a distinct "pixelated" border style. Uses the 'Press Start 2P' bitmap font. Animations include the ECG line, trader emoji state changes (pulse, shake), and screen flashes/shakes for game events.
*   **Audio (Suggestions - Not Implemented):**
    *   UI Sounds: Button clicks, slider adjustment ticks.
    *   Game Events: Sound for opening a trade, closing a trade (different sounds for profit/loss - e.g., cha-ching vs. dull thud), liquidation alarm/explosion, timer tick-tock (increasing intensity near end), game over stinger.
    *   Ambiance: Low, unobtrusive retro electronic background music loop during the trading phase.

## 6. Technical

*   **Frontend Framework:** React (`react`, `react-dom`)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS for layout and utility classes, supplemented by Custom CSS (`App.css`, `index.css`, inline styles in components) for specific pixel art styling, animations (`@keyframes`), and component-level visual details.
*   **Language:** JavaScript (ES6+) with JSX.
*   **State Management:** Primarily React's built-in `useState` and `useEffect` hooks within the `InteractiveTradingPreview` component. Props are passed down to child components.