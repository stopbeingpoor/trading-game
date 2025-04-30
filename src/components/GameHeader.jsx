import React from 'react';

// Import character images
import StoicImg from '../assets/Characters/Stoic.png';
import NervousNewbieImg from '../assets/Characters/NervousNewbie.png';
import FullDegenImg from '../assets/Characters/FullDegen.png';

// Map character names to images
const characterImages = {
  Stoic: StoicImg,
  NervousNewbie: NervousNewbieImg,
  FullDegen: FullDegenImg,
};


// Define the props the component will accept
const GameHeader = ({
  character, // Changed from selectedCharacterName as per task mandate
  walletBalance,
  totalPnl,
  timeElapsed,
  sanity,
  formatPnl, // Function passed from parent
  formatTime, // Function passed from parent
}) => {
  return (
    <header className="pixel-container p-2 mb-2">
      <h1 className="pixel-header text-center">STOP BEING POOR</h1>
      <div className="flex justify-between items-start">
        {/* Left Column: Trader Info + Sanity */}
        <div className="flex flex-col gap-2">
          <div className="trader-box">
            {/* Display selected character image and name */}
            <div className="flex gap-2 items-center">
              {character && character.name && characterImages[character.name] ? ( // Check if character object and name exist and has a matching image
                <>
                  <img
                    src={characterImages[character.name]} // Use character name for image lookup
                    alt={character.name} // Use character name for alt text
                    className="w-12 h-12 object-contain pixelated"
                  />
                  <div>
                    {/* Display the character name */}
                    <div className="trader-title">{character.name}</div>
                  </div>
                </>
              ) : (
                // Fallback if character prop is falsy or doesn't match image map
                <div>No Character</div>
              )}
            </div>
          </div>
          {/* Sanity Container */}
          <div className="sanity-container"> {/* Removed fixed width */}
            <div className="flex items-center gap-1">
              <span className="brain-icon">🧠</span> {/* Note: brain-icon class defined in InteractiveTradingPreview CSS */}
              <span className="sanity-text">SANITY</span>
              <span className={`sanity-value ${
                sanity > 6 ? 'text-[#00ff00]' :
                sanity > 4 ? 'text-[#ffcc00]' :
                sanity > 2 ? 'text-[#ff9900]' :
                'text-[#ff3333]'
              }`}>{sanity}/8</span>
            </div>
            <div className="sanity-bar">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`sanity-segment ${
                    i < sanity
                      ? i >= 6
                        ? 'filled'
                        : i >= 4
                          ? 'warning'
                          : i >= 2
                            ? 'warning'
                            : 'danger'
                      : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Stats */}
        <div className="flex flex-col items-end gap-2"> {/* Main right column container */}
          {/* Horizontal group for Wallet and PNL */}
          <div className="flex items-center gap-4"> {/* Use items-center for vertical alignment if needed */}
            {/* Wallet Balance Block */}
            <div className="flex flex-col items-end">
              <div className="text-sm opacity-70">WALLET BALANCE</div>
              {/* Use formatPnl prop */}
              <div className="text-lg">{formatPnl(walletBalance)}</div>
            </div>
            {/* Total PNL Block */}
            <div className="flex flex-col items-end">
              <div className="text-sm opacity-70">TOTAL PNL</div>
              {/* Use formatPnl prop */}
              <div className={`text-lg ${totalPnl >= 0 ? 'text-[#00ff00]' : 'text-[#ff3333]'}`}>
                {formatPnl(totalPnl)}
              </div>
            </div>
          </div>
          {/* Timer (Moved below Wallet/PNL group) */}
          {/* Styled Timer */}
          <div className="text-3xl font-['Press_Start_2P'] text-neon-red bg-black border-2 border-neon-red px-4 py-2 flex items-center">
            {/* Red Dot */}
            <span className="w-3 h-3 bg-neon-red rounded-full mr-3"></span>
            {/* Use formatTime prop */}
            {formatTime(timeElapsed)}
          </div>
          {/* Sanity Container was moved */}
        </div>
      </div>
    </header>
  );
};

export default GameHeader;