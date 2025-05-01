import React from 'react';

// Import character images
import StoicImg from '../assets/Characters/Stoic.png';
import NervousNewbieImg from '../assets/Characters/NervousNewbie.png';
import FullDegenImg from '../assets/Characters/FullDegen.png';

// Map character names to images
const characterImages = {
  'Stoic': StoicImg, // Added quotes for consistency, though not strictly needed here
  'Nervous Newbie': NervousNewbieImg, // Added space and quotes
  'Full Degen': FullDegenImg, // Added space and quotes
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
    <header className="pixel-container p-0.5 sm:p-2 mb-0.5 sm:mb-2"> {/* Reduced base padding/margin */}
      <h1 className="pixel-header text-center text-lg sm:text-2xl">STOP BEING POOR</h1> {/* Responsive text */}
      {/* Stacks vertically on mobile, row on small+, aligns center on mobile */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-1 sm:gap-4"> {/* Reduced base gap */}
        {/* Left Column: Trader Info + Sanity */}
        <div className="flex flex-col gap-0.5 sm:gap-2 w-full sm:w-auto"> {/* Reduced base gap, width */}
          <div className="trader-box p-0.5 sm:p-2"> {/* Reduced base padding */}
            {/* Display selected character image and name */}
            <div className="flex gap-2 items-center">
              {character && character.name && characterImages[character.name] ? ( // Check if character object and name exist and has a matching image
                <>
                  <img
                    src={characterImages[character.name]} // Use character name for image lookup
                    alt={character.name} // Use character name for alt text
                    className="w-8 h-8 sm:w-12 sm:h-12 object-contain pixelated" /* Smaller image on mobile */
                  />
                  <div>
                    {/* Display the character name */}
                    <div className="trader-title text-xs sm:text-sm">{character.name}</div> {/* Responsive text */}
                  </div>
                </>
              ) : (
                // Fallback if character prop is falsy or doesn't match image map
                <div>No Character</div>
              )}
            </div>
          </div>
          {/* Sanity Container - Now uses flexbox for horizontal layout */}
          <div className="sanity-container flex items-center gap-x-2 p-0.5 sm:p-2"> {/* Added flex, items-center, gap-x-2 */}
            {/* Brain Icon */}
            <span className="brain-icon text-sm sm:text-base">🧠</span> {/* Responsive text */}

            {/* Sanity Bar */}
            <div className="sanity-bar flex-grow"> {/* Added flex-grow to allow bar to take space */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`sanity-segment ${
                    i < sanity
                      ? i >= 6
                        ? 'filled'
                        : i >= 4
                          ? 'warning' // Changed from 'warning' to 'warning' (no change, just noting for clarity)
                          : i >= 2
                            ? 'warning' // Changed from 'warning' to 'warning' (no change, just noting for clarity)
                            : 'danger'
                      : ''
                  }`}
                />
              ))}
            </div>

            {/* Sanity Value Removed */}
          </div>
        </div>

        {/* Right Column: Stats - Aligns center on mobile, end on small+ */}
        <div className="flex flex-col items-center sm:items-end gap-0.5 sm:gap-2 w-full sm:w-auto"> {/* Reduced base gap, width, alignment */}
          {/* Horizontal group for Wallet and PNL - Stacks on very small screens if needed (optional, using gap for now) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-1 sm:gap-4"> {/* Reduced base gap, stacks on mobile */}
            {/* Wallet Balance Block */}
            <div className="flex flex-col items-center sm:items-end"> {/* Adjusted alignment */}
              <div className="text-xs sm:text-sm opacity-70">WALLET BALANCE</div> {/* Responsive text */}
              {/* Use formatPnl prop */}
              <div className="text-base sm:text-lg">{formatPnl(walletBalance)}</div> {/* Responsive text */}
            </div>
            {/* Total PNL Block */}
            <div className="flex flex-col items-center sm:items-end"> {/* Adjusted alignment */}
              <div className="text-xs sm:text-sm opacity-70">TOTAL PNL</div> {/* Responsive text */}
              {/* Use formatPnl prop */}
              <div className={`text-base sm:text-lg ${totalPnl >= 0 ? 'text-[#00ff00]' : 'text-[#ff3333]'}`}> {/* Responsive text */}
                {formatPnl(totalPnl)}
              </div>
            </div>
            </div> {/* Closes Wallet/PNL group */}

            {/* Timer (Now correctly inside Right Column) */}
            {/* Styled Timer */}
            {/* Responsive text size, padding, margin - Reduced base size/padding */}
            <div className="text-lg sm:text-3xl font-['Press_Start_2P'] text-neon-red bg-black border-2 border-neon-red px-1 py-0.5 sm:px-4 sm:py-2 flex items-center mt-0.5 sm:mt-0">
              {/* Red Dot */}
              <span className="w-2 h-2 sm:w-3 sm:h-3 bg-neon-red rounded-full mr-1 sm:mr-3"></span> {/* Reduced base margin */}
              {/* Use formatTime prop */}
              {formatTime(timeElapsed)}
            </div>
            {/* Sanity Container was moved */}
          </div> {/* Closes Right Column */}
      </div>
    </header>
  );
};

export default GameHeader;