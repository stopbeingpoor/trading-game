import React, { useState } from 'react';
import InteractiveTradingPreview from './components/InteractiveTradingPreview';
import GameViewportScaler from './components/GameViewportScaler'; // Import the scaler
import CharacterSelect from './components/CharacterSelect'; // Import the new component
import './App.css';

// Define game states
const GAME_STATE = {
  START: 'START',
  CHARACTER_SELECT: 'CHARACTER_SELECT',
  TRADING: 'TRADING',
};

function App() {
  const [gameState, setGameState] = useState(GAME_STATE.START);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleStartGame = () => {
    setGameState(GAME_STATE.CHARACTER_SELECT);
  };

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setGameState(GAME_STATE.TRADING);
  };

  const renderContent = () => {
    switch (gameState) {
      case GAME_STATE.CHARACTER_SELECT:
        return <CharacterSelect onSelect={handleCharacterSelect} />;
      case GAME_STATE.TRADING:
        // Pass selectedCharacter to the trading preview
        return <InteractiveTradingPreview selectedCharacter={selectedCharacter} />;
      case GAME_STATE.START:
      default:
        return (
          <div className="h-full w-full flex flex-col items-center justify-center bg-black text-[#00ff00]">
            <h1 className="text-4xl font-['Press_Start_2P'] mb-8">STOP BEING POOR</h1>
            <button
              onClick={handleStartGame}
              className="pixel-button bg-[#00ff00] text-black hover:bg-[#00cc00] px-8 py-4 text-xl font-['Press_Start_2P']"
            >
              START GAME
            </button>
          </div>
        );
    }
  };

  // The GameViewportScaler now handles the full screen layout, scaling, and centering.
  // The #root element (styled in index.css) provides the base 100% width/height.
  return (
    <GameViewportScaler>
      {renderContent()}
    </GameViewportScaler>
  );
}

export default App;
