# Changelog

## Version 0.5.0 - 2025-07-02

This version introduces major features and a significant number of enhancements and fixes.

### ✨ New Features

- **User Authentication:** Players can now create accounts and log in using Google.
- **Player Profiles:** User data such as username and wallet balance is now saved and loaded from the backend.
- **Guest Mode:** Players can now choose to play as a guest without creating an account.
- **Persistent Player Data:** Wallet balance is now persistent across game sessions for logged-in users.

### 🎨 UI/UX Enhancements

- **Character Select Screen:** Added a personalized welcome message and character descriptions on hover.
- **Trading Screen:**
    - Relocated the Sanity meter to the trading panel.
    - Relocated the timer to the bottom-right of the chart.
- **Login Screen:**
    - Added an animated background and a prominent welcome message.

### 🐛 Bug Fixes

- Fixed a critical bug where the player's wallet balance would reset after finishing a game.
- Fixed a crash caused by incorrect imports.

### ⚙️ Other

- Major refactoring of the authentication flow.
- Significant database schema changes to support player profiles.
- Removed old access code verification system.