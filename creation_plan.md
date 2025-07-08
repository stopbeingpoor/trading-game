# Creation Plan: Next Features

This document outlines the plan for the next set of features to be implemented in the game.

## 1. Profile Editing

- **Objective:** Allow users to edit their public profile information.
- **Tasks:**
    - **UI/UX:** Design and implement a profile editing page where users can change their `username`.
    - **Backend:**
        - Create a new RLS policy to allow users to update their own `profiles` row.
        - Implement a function in `supabaseClient.js` to handle the profile update.
    - **State Management:** Ensure the local user profile state is updated after a successful change.

## 2. Trader Statistics & History

- **Objective:** Provide players with detailed statistics and a history of their past trades.
- **Tasks:**
    - **Database:**
        - Create a new `trades` table to log every trade a user makes. It should include columns for `user_id`, `entry_price`, `exit_price`, `pnl`, `leverage`, `timestamp`, etc.
    - **Backend:**
        - Implement logic to record every completed trade in the new `trades` table.
    - **Frontend:**
        - Create a new "History" or "Statistics" page.
        - Display key performance indicators (KPIs) like:
            - All-time PNL
            - Win/Loss Ratio
            - Average trade duration
            - Biggest win / worst loss
        - Display a table with the user's complete trade history.

## 3. Leaderboard

- **Objective:** Create a competitive leaderboard to rank players.
- **Tasks:**
    - **Backend:**
        - Create a database view or a function to query the top players based on `wallet_balance`.
        - Consider different timeframes (e.g., Daily, Weekly, All-Time).
    - **Frontend:**
        - Design and implement a `Leaderboard` component.
        - Fetch and display the leaderboard data.
        - Ensure the current user's rank is highlighted.

## 4. Share on X (Twitter)

- **Objective:** Allow players to share their achievements on social media.
- **Tasks:**
    - **UI/UX:** Add a "Share" button to the Game Over screen or on the statistics page.
    - **Frontend:**
        - Implement a function that, when clicked, opens a new window with a pre-filled tweet.
        - The tweet could include their PNL, a link to the game, and relevant hashtags (e.g., `#StopBeingPoorGame`).
        - Example: `https://twitter.com/intent/tweet?text=I just made a 5x trade on Stop Being Poor! Can you beat me?&url=https://stop-being-poor.com`

## 5. Referral System

- **Objective:** Implement a referral system to encourage user growth.
- **Tasks:**
    - **Database:**
        - Add a `referral_code` column to the `profiles` table.
        - Add a `referred_by` column to the `profiles` table to track who referred a new user.
        - Create a table to manage referral rewards.
    - **Backend:**
        - Generate a unique referral code for each new user.
        - Create a function to handle the logic when a new user signs up with a referral code (e.g., grant rewards to both the referrer and the new user).
    - **Frontend:**
        - Display the user's referral code on their profile page.
        - Add a field to the Sign-Up flow for entering a referral code.