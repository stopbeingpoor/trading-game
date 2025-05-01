import React from 'react';
const TradingPanel = ({
  position, // To disable leverage slider
  leverage,
  setLeverage, // Callback to update leverage
  heartRate,
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
      </div>
    </div>
  );
};

export default TradingPanel;