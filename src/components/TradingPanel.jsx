import React from 'react';
const TradingPanel = ({
  position, // To disable leverage slider
  walletBalance,
  leverage,
  setLeverage, // Callback to update leverage
  heartRate,
  showMobileControls, // To handle mobile visibility
}) => {
  return (
    <div className={`${!showMobileControls ? 'hidden' : ''} md:block md:col-span-1 flex flex-col gap-2 overflow-auto`}>
      {/* Trading Settings */}
      <div className="pixel-container p-2">
        <h3 className="text-lg font-bold mb-2">TRADING SETTINGS</h3>

        {/* Position Size Display (Full Wallet Balance) */}
        <div className="mb-3">
          <div className="cyber-slider-container">
            <div className="flex justify-between mb-1">
              <span className="slider-label status-label">Position Size:</span>
              <span className="slider-value status-label">${walletBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>

        {/* Leverage Control */}
        <div className="mb-3">
          <div className={`cyber-slider-container ${leverage > 100 ? 'high-leverage-warning' : ''}`}>
            <div className="flex justify-between mb-1">
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
            <div className="flex justify-between mt-1">
              <span className="status-label text-[10px] text-[#00ff00]">1x</span>
              <span className="status-label text-[10px] text-[#ffcc00]">100x</span>
              <span className="status-label text-[10px] text-[#ff3333]">1000x</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trader Status */}
      <div className="pixel-container p-2 flex-grow">
        <h3 className="text-lg font-bold mb-2">TRADER STATUS</h3>

        {/* Heart rate */}
        <div className="flex flex-col mb-4 bg-black p-2 border-2 border-[#333] rounded-sm">
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