import React from 'react';

const TradingActions = ({
  position, // To disable buttons
  leverage,
  tradeHistory,
  totalPnl,
  formatPnl, // Function passed from parent
  handleBuy, // Callback
  handleSell, // Callback
  handleClose, // Callback
  showMobileControls, // To handle mobile visibility
}) => {
  return (
    <footer className={`mt-2 ${!showMobileControls ? 'block' : 'hidden'} md:block`}>
      {/* Position and Trade Summary */}
      <div className="pixel-container p-2 mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-lg opacity-70 mr-2">Trading:</span>
          <span className="text-lg font-bold">Full Balance at {leverage}x</span>
        </div>
        <div>
          <span className="text-lg opacity-70 mr-2">Trades:</span>
          <span className="text-lg font-bold">{tradeHistory.length}</span>
        </div>
        <div>
          <span className="text-lg opacity-70 mr-2">PNL:</span>
          <span className={`text-lg font-bold ${totalPnl >= 0 ? 'text-[var(--pixel-primary)]' : 'text-[var(--pixel-secondary)]'}`}>
            {formatPnl(totalPnl)}
          </span>
        </div>
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