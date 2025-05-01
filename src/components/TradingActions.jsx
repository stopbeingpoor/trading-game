import React from 'react';

const TradingActions = ({
  position, // To disable buttons
  leverage,
  walletBalance, // Added walletBalance prop
  tradeHistory,
  totalPnl,
  formatPnl, // Function passed from parent
  handleBuy, // Callback
  handleSell, // Callback
  handleClose, // Callback
  // showMobileControls, // Removed - No longer used here
}) => {
  return (
    <footer className="mt-1 sm:mt-2 p-1"> {/* Adjusted margin/padding */}
      {/* Footer is always rendered */}
      {/* Position and Trade Summary - Stacks on mobile */}
      <div className="pixel-container p-1 sm:p-2 mb-1 sm:mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
        {/* Use smaller text on mobile */}
        <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start">
          <span className="text-sm sm:text-base opacity-70 mr-2">Trading:</span>
          <span className="text-sm sm:text-base font-bold">{formatPnl(walletBalance)} @ {leverage}x</span>
        </div>
        <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start">
          <span className="text-sm sm:text-base opacity-70 mr-2">Trades:</span>
          <span className="text-sm sm:text-base font-bold">{tradeHistory.length}</span>
        </div>
        <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start">
          <span className="text-sm sm:text-base opacity-70 mr-2">PNL:</span>
          <span className={`text-sm sm:text-base font-bold ${totalPnl >= 0 ? 'text-[var(--pixel-primary)]' : 'text-[var(--pixel-secondary)]'}`}>
            {formatPnl(totalPnl)}
          </span>
        </div>
        {/* Removed extra closing div here */}
      </div>

      {/* Trading buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          className={`pixel-button buy-button ${
            position === 'buy' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleBuy}
          disabled={position === 'buy'}
        >
          BUY/LONG
        </button>
        <button
          className={`pixel-button sell-button ${
            position === 'sell' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleSell}
          disabled={position === 'sell'}
        >
          SELL/SHORT
        </button>
        <button
          className={`pixel-button close-button ${
            !position ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleClose}
          disabled={!position}
        >
          CLOSE
        </button>
      </div>
    </footer>
  );
};

export default TradingActions;