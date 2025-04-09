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

**Feature:**

- Sanity now declines **only** when the player clicks the **Buy** or **Sell** button.
- The amount of sanity decline depends on the selected trading type:
  - **Stoic:** decreases by 0.5 bars
  - **Nervous Newbie:** decreases by 1 bar
  - **Full Degen:** decreases by 1.5 bars
- Sanity is clamped to a minimum of 0 and rounded to 1 decimal place.
- When sanity reaches **zero**, the game ends and transitions to the **Game Over** screen.

**Implementation Details:**

- Logic added inside `handleBuy` and `handleSell` functions in `InteractiveTradingPreview.jsx`.
- After each buy/sell click:
  - Calculate decrement based on `selectedCharacter.name`.
  - Update sanity state accordingly.
  - If sanity reaches zero, set `isGameOver` to true, triggering the end screen.

**Affected Files:**

- `src/components/InteractiveTradingPreview.jsx`

**Mermaid Diagram:**

```mermaid
flowchart TD
    A[User clicks Buy/Sell button]
    B{Check selectedCharacter.name}
    A --> B
    B -->|Stoic| C[Decrease sanity by 0.5]
    B -->|Nervous Newbie| D[Decrease sanity by 1]
    B -->|Full Degen| E[Decrease sanity by 1.5]
    C --> F[Clamp sanity >= 0]
    D --> F
    E --> F
    F --> G{Is sanity <= 0?}
    G -->|Yes| H[Set isGameOver = true]
    G -->|No| I[Update sanity state]
    H --> J[Show Game Over screen]
    I --> K[Update sanity bar UI]

---

## 2025-04-09 - Redesign Timer (Retro Neon Futuristic)

**Goal:**

Make the timer in the top-right corner larger and style it with a "retro neon futuristic" aesthetic using Neon Cyan (`#00ffff`).

**Plan:**

1.  **Style Definition:**
    *   **Font:** Keep `'Press Start 2P'`.
    *   **Size:** Increase significantly (e.g., `text-3xl` or `text-4xl`).
    *   **Color:** Use Neon Cyan (`#00ffff`).
    *   **Effects:** Apply a neon glow using `text-shadow`.
    *   **Container:** Increase padding, use Neon Cyan border (thicker), keep dark background.
    *   **Dot:** Change color to Neon Cyan.

2.  **Implementation Approach (Tailwind Primarily):**
    *   **Modify `tailwind.config.js`:**
        *   Extend theme colors: `colors: { 'neon-cyan': '#00ffff' }`.
        *   Add custom `textShadow` utility: `textShadow: { 'neon-cyan': '0 0 8px #00ffff, 0 0 16px #00ffff' }`.
    *   **Modify `src/components/GameHeader.jsx`:**
        *   Update Tailwind classes on timer `div` (size, color, border, padding, shadow).
        *   Update Tailwind class on dot `span` (`bg-neon-cyan`).
    *   **Modify `src/index.css`:**
        *   Remove/comment out conflicting `.timer-display` styles (lines 648-658).

**Affected Files:**

*   `tailwind.config.js`
*   `src/components/GameHeader.jsx`
*   `src/index.css`

**Visual Plan (Mermaid Diagram):**

```mermaid
graph TD
    A[Start: Current Timer (Red, Small)] --> B{Analyze Requirements};
    B --> C{Identify Relevant Files: GameHeader.jsx, index.css, tailwind.config.js};
    C --> D{Define New Style: Bigger, Neon Cyan, Glow Effect};
    D --> E{Plan Implementation};
    subgraph E [Implementation Steps]
        E1[Extend tailwind.config.js: Add neon-cyan color & text-shadow]
        E2[Modify GameHeader.jsx: Apply new Tailwind classes (size, color, border, padding, shadow)]
        E3[Modify index.css: Remove/comment out conflicting .timer-display styles]
    end
    E --> F[Result: Retro Neon Futuristic Timer];