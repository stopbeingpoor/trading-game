# Changelog

## 2025-07-04 - Move Sanity Meter in Header

**Plan:**

Modify `src/components/GameHeader.jsx` to reposition the Sanity Meter.

1.  Wrap the existing `div.trader-box` (character info) and the `div.sanity-container` (sanity meter) within a new vertical flex container (`<div class="flex flex-col gap-2">`).
2.  Place this new container as the first element within the main horizontal flex container (`<div class="flex justify-between items-start">`).
3.  The `div.sanity-container` will be moved from the right-side stats block into this new left-side vertical container, positioned directly below the `div.trader-box`.
4.  The remaining stats (Wallet/PNL/Timer) will remain on the right side.

**Affected Files:**

*   `src/components/GameHeader.jsx`

**Visual Representation:**

```mermaid
graph TD
    subgraph GameHeader.jsx
        A[Header Title: STOP BEING POOR]
        subgraph Main Flex Container (justify-between, items-start)
            subgraph Left Column (flex flex-col gap-2)
                B[div.trader-box (Character Info)]
                C[div.sanity-container (Sanity Meter)]
            end
            subgraph Right Column (flex flex-col items-end gap-2)
                D[Wallet/PNL/Timer Group]
            end
        end
    end

    B --> C
```

---

## 2025-04-09 - Implement Sanity Decline on Buy/Sell with Game Over Condition

*(...previous entries unchanged...)*

---

## 2025-04-11 - Refactor Trading Simulation to Point-Based System with ATR Volatility and Mean Reversion

**Summary:**

- Switched the entire trading simulation to a **point-based price system** ranging conceptually from 0 to 9999, similar to an index.
- **Removed hard clamping** at 0 and 9999 to avoid player exploits.
- Introduced **Mean Reversion** logic to gently pull prices back toward a central value, keeping prices generally within range but allowing natural drift.
- **Volatility** is now calculated using **Average True Range (ATR)** in absolute points, rather than percentages.
- **Support and Resistance** influence is applied in points, affecting price changes near recent highs/lows.
- **PNL calculation** is now based on **$10 per point movement** times leverage, matching index-like behavior.
- **Liquidation price** is calculated based on the point difference required to deplete the margin, considering the $10/point factor.
- Updated **chart scaling** and **price formatting** to reflect the point-based system.
- The simulation now better mimics an index with realistic volatility and avoids hard, exploitable price caps.

**Affected Files:**

- `src/components/InteractiveTradingPreview.jsx`

**Notes:**

- The price can temporarily exceed 0-9999 but will tend to revert back toward the center.
- This avoids the exploitability of hard caps while maintaining intuitive PNL calculations.
- Further tuning of mean reversion strength and volatility factors may be needed for ideal gameplay balance.