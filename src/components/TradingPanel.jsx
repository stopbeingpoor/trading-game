import React from 'react';

import StoicImg from '../assets/Characters/Stoic.png';
import NervousNewbieImg from '../assets/Characters/NervousNewbie.png';
import FullDegenImg from '../assets/Characters/FullDegen.png';

const characterImages = {
  'Stoic': StoicImg,
  'Nervous Newbie': NervousNewbieImg,
  'Full Degen': FullDegenImg,
};

const TradingPanel = ({
  position, // To disable leverage slider
  leverage,
  setLeverage, // Callback to update leverage
  heartRate,
  sanity,
  character,
  // showMobileControls, // Removed - No longer used here
}) => {
  return (
    <div className="flex flex-col gap-2 p-0.5 sm:p-1"> {/* Removed overflow-auto, adjusted padding */}
      {/* Panel is always rendered; parent grid controls visibility/placement */}
      {/* Trading Settings */}
      {/* Reverted overflow/height changes, kept reduced padding */}
      <div className="pixel-container p-0.5 sm:p-1"> {/* Adjusted padding */}
        <h3 className="text-sm sm:text-base font-bold mb-1">TRADING SETTINGS</h3> {/* Adjusted margin */}

        {/* Leverage Control - Reduced bottom margin */}
        <div className="mb-1 sm:mb-2"> {/* Adjusted margin */}
          <div className={`cyber-slider-container ${leverage > 100 ? 'high-leverage-warning' : ''}`}>
            {/* Added flex-wrap, removed bottom margin */}
            <div className="flex justify-between flex-wrap mb-0"> {/* Adjusted margin */}
              <span className="slider-label status-label">LEVERAGE</span>
              <span className={`slider-value status-label ${
                leverage > 500 ? 'text-[#ff3333]' :
                leverage > 100 ? 'text-[#ffcc00]' :
                'text-[#00ff00]'
              }`}>
                {leverage}x
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="1000"
              step="1"
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="retro-slider w-full"
              disabled={position !== null} // Use position prop
            />
            {/* Leverage value indicators removed */}
          </div>
        </div>
      </div>

      {/* Trader Status */}
      {/* Applied responsive padding directly - Removed flex-grow */}
      <div className="pixel-container p-0.5 sm:p-1"> {/* Adjusted padding */}
        <h3 className="text-sm sm:text-base font-bold mb-1">TRADER STATUS</h3> {/* Adjusted margin */}

        {/* Heart rate */}
        <div className="flex flex-col mb-2 sm:mb-3 bg-black p-2 border-2 border-[#333] rounded-sm"> {/* Adjusted margin */}
          <div className="flex justify-between mb-1">
            <span className="status-label">BPM</span>
          </div>
          <div className={`heart-rate-monitor ${
            heartRate > 140 ? 'data-state="danger"' :
            heartRate > 100 ? 'data-state="warning"' :
            ''
          } ${
            heartRate > 140 ? 'data-rate="high"' :
            heartRate < 80 ? 'data-rate="low"' :
            ''
          }`}>
            <div className="heart-rate-grid"></div>
            <div className="ecg-line"></div>
            <span className="heart-icon">❤️</span> {/* Note: heart-icon class defined in InteractiveTradingPreview CSS */}
            <span className="heart-rate-value">{heartRate}</span>
          </div>
        </div>
        {/* Sanity Container */}
        <div className="sanity-container flex items-center gap-x-2 p-0.5 sm:p-2">
          <span className="brain-icon text-sm sm:text-base">🧠</span>
          <div className="sanity-bar flex-grow">
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
        {/* Trader Profile Display */}
        <div className="flex gap-2 mt-2 h-32">
          {/* Box 1: Picture */}
          <div className="flex-grow trader-profile-box">
            {character && character.name && characterImages[character.name] ? (
              <img
                src={characterImages[character.name]}
                alt={character.name}
                className="h-full w-auto object-contain pixelated p-1"
              />
            ) : (
              <span className="text-red-500">PICTURE</span>
            )}
          </div>
          {/* Box 2: Name */}
          <div className="w-1/3 trader-profile-box">
            <span className="text-red-500 font-['Press_Start_2P'] text-center text-sm leading-tight">
              {character ? character.name.replace(' ', '\n') : 'Full\nDegen'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPanel;