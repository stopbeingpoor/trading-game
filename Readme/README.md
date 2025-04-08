# Stop Being Poor: Trading Simulator

A fast-paced, high-stakes retro trading simulation game where you manage risk and emotion under pressure. Can you beat the market before time runs out or you get liquidated?

## Features

-   **Real-time Candlestick Chart:** Watch the price action unfold.
-   **Character Selection:** Choose your trader persona (Stoic, Nervous Newbie, Full Degen).
-   **Trading:** Open LONG (Buy) or SHORT (Sell) positions. Only one position at a time.
-   **Leverage:** Select leverage from 1x to 1000x *before* opening a position to multiply potential gains and losses.
-   **High Stakes:** Your *entire wallet balance* is automatically used as the margin/size for each trade.
-   **Real-time PNL:** Track your Profit and Loss dynamically.
-   **Liquidation:** If your losses equal your wallet balance at entry, you're liquidated! Game over.
-   **Sanity Meter:** Manage your trader's mental state (0-8), affected by losses and high leverage.
-   **Heart Rate (BPM):** Monitor your trader's stress level, influenced by trades, PNL swings, and leverage.
-   **Game Timer:** Race against the clock! Each session lasts 2 minutes (120 seconds).
-   **Trade History:** Review your performance after the game ends.

## How to Run the Game

### Prerequisites

-   Node.js (version 14 or higher recommended)
-   npm (comes with Node.js)

### Installation

1.  Clone or download this repository.
2.  Open a terminal/command prompt.
3.  Navigate to the project directory.
4.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Game

To start the game in development mode:

```bash
npm run dev
```

This will start the development server. Open your browser and navigate to the URL provided (usually http://localhost:5173).

## How to Play

1.  **Start Game:** Launch the application.
2.  **Select Character:** Choose your trader persona.
3.  **Set Leverage:** Adjust the leverage slider (1x-1000x). This cannot be changed once a position is open.
4.  **Open Position:**
    *   Click "BUY/LONG" if you predict the price will increase.
    *   Click "SELL/SHORT" if you predict the price will decrease.
    *   Your *entire current wallet balance* will be used as the margin for this trade.
5.  **Monitor:**
    *   Watch your real-time PNL.
    *   Keep an eye on the Sanity Meter and Heart Rate.
    *   Be aware of the Liquidation Price shown on the chart!
6.  **Close Position:** Click "CLOSE" to lock in your profit or loss *before* the timer runs out or you get liquidated.
7.  **Game End:** The game ends when the 2-minute timer expires or if your position is liquidated. Review your results and play again!

## Game Mechanics Summary

-   **Starting Balance:** $10,000
-   **Position Size:** Always 100% of current wallet balance at the time of entry.
-   **PNL Calculation:** `(Current Price - Entry Price) / Entry Price * Wallet Balance at Entry * Leverage` (Sign flipped for SHORTs).
-   **Liquidation:** Occurs automatically if `Negative PNL >= Wallet Balance at Entry`. Results in $0 balance and game over.
-   **Timer:** Fixed 120 seconds per trading session.
-   **Sanity (0-8):** Decreases with realized losses, high leverage use, and high PNL volatility. Primarily affects trader visuals.
-   **Heart Rate (BPM):** Increases when opening positions, during large PNL swings, and with higher leverage. Affects trader status display.

## Tips

-   Higher leverage dramatically increases both potential profit and the risk of liquidation.
-   Manage risk carefully; high leverage on volatile assets is dangerous.
-   Pay attention to the Sanity Meter and Heart Rate as indicators of stress.
-   Closing a position locks in the current PNL.

Enjoy the game and try not to go broke!
