import React from 'react';

const GameOver = ({
  isLiquidated,
  liquidationDetails,
  walletBalance,
  totalPnl,
  tradeHistory,
  formatPnl, // Function passed from parent
  formatPrice, // Function passed from parent
  resetGame, // Callback
}) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-black text-[#00ff00]">
      <h1 className="text-4xl font-['Press_Start_2P'] mb-8">
        {isLiquidated ? "LIQUIDATED!" : "TIME'S UP!"}
      </h1>

      {isLiquidated && liquidationDetails && (
        <div className="mb-6 p-4 border border-[#ff3333] bg-[rgba(255,51,51,0.1)]">
          <div className="text-lg mb-2 font-['Press_Start_2P'] text-[#ff3333]">POSITION LIQUIDATED</div>
          <div className="text-md mb-1">
            Position: {liquidationDetails.type === 'buy' ? 'LONG' : 'SHORT'}
          </div>
          <div className="text-md mb-1">
            Entry Price: ${formatPrice(liquidationDetails.entryPrice)}
          </div>
          <div className="text-md mb-1">
            Liquidation Price: ${formatPrice(liquidationDetails.liquidationPrice)}
          </div>
          <div className="text-md mb-1">
            Leverage: {liquidationDetails.leverage}x
          </div>
        </div>
      )}

      <div className="text-xl mb-4 font-['Press_Start_2P']">Final Balance: {formatPnl(walletBalance)}</div>
      <div className="text-xl mb-8 font-['Press_Start_2P']">Total PNL: {formatPnl(totalPnl)}</div>

      {/* Trade History */}
      <div className="mt-4 w-full max-w-md mb-8"> {/* Added margin-top/bottom and constrained width */}
        <div className="pixel-container p-2">
          <h3 className="text-lg font-bold mb-2 text-center">TRADE HISTORY</h3> {/* Centered title */}
          {tradeHistory.length > 0 ? (
            <div className="relative">
              <div className="overflow-y-auto max-h-[150px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}> {/* Increased max-height */}
                <table className="pixel-table w-full">
                  <thead className="sticky top-0 bg-[var(--pixel-bg)] z-10">
                    <tr>
                      <th className="text-xs py-1">Type</th>
                      {/* Removed Entry and Exit headers */}
                      <th className="text-xs py-1">PNL</th>
                  </tr>
                </thead>
                  <tbody className="text-xs">
                    {tradeHistory.slice().reverse().map((trade, i) => (
                      <tr key={i} className="hover:bg-[rgba(0,255,0,0.1)]">
                        <td className={`py-1 text-center ${trade.type === 'buy' ? 'text-[var(--pixel-primary)]' : 'text-[var(--pixel-secondary)]'}`}> {/* Centered */}
                        {trade.type === 'buy' ? 'LONG' : 'SHORT'}
                      </td>
                        {/* Removed Entry and Exit data cells */}
                        <td className={`py-1 text-center ${trade.pnl >= 0 ? 'text-[var(--pixel-primary)]' : 'text-[var(--pixel-secondary)]'}`}> {/* Centered */}
                        {formatPnl(trade.pnl)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          ) : (
            <p className="text-sm opacity-70 text-center mt-2">No trades recorded.</p>
          )}
        </div>
      </div>

      <button
        onClick={resetGame} // Use resetGame prop
        className="pixel-button bg-[#00ff00] text-black hover:bg-[#00cc00] px-8 py-4 text-xl font-['Press_Start_2P']"
      >
        PLAY AGAIN
      </button>
    </div>
  );
};

export default GameOver;