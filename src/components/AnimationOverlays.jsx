import React from 'react';

const AnimationOverlays = ({
  showProfitAnimation,
  showLossAnimation,
  showLiquidationAnimation,
  pnlAmount, // Add pnlAmount prop
}) => {
  // Helper to format PnL (basic example, might need refinement)
  const formatPnl = (amount) => {
    if (typeof amount !== 'number') return amount; // Assume already formatted if not a number
    const sign = amount >= 0 ? '+' : '';
    return `${sign}$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formattedPnl = formatPnl(pnlAmount);

  return (
    <>
      {/* Profit/Loss Background Animation Overlay */}
      <div className={`animation-overlay ${showProfitAnimation ? 'animate-profit-screen' : ''} ${showLossAnimation ? 'animate-loss-screen' : ''}`} />

      {/* Profit/Loss PNL Text Overlay */}
      {(showProfitAnimation || showLossAnimation) && formattedPnl && (
         <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"> {/* Ensure high z-index */}
           <div
             className={`text-5xl font-['Press_Start_2P'] ${pnlAmount > 0 ? 'text-[#00ff00]' : 'text-[#ff3333]'}`} // Green for profit, Red for loss
             style={{
               animation: 'pnlTextAnimation 0.8s ease-out forwards', // Use the new animation
               textShadow: pnlAmount > 0 ? '0 0 10px #00ff00, 0 0 20px #00ff00' : '0 0 10px #ff3333, 0 0 20px #ff3333' // Green shadow for profit, Red for loss
             }}
           >
             {formattedPnl}
           </div>
         </div>
       )}

      {/* Liquidation Animation Overlay */}
      {showLiquidationAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"> {/* Original z-index was 50 */}
          {/* Screen flash overlay */}
          <div
            className="absolute inset-0"
            style={{
              animation: 'screenFlash 0.5s ease-in-out',
              backgroundColor: 'rgba(255, 0, 0, 0)'
            }}
          />

          {/* Screen shake container */}
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ animation: 'screenShake 0.5s ease-in-out' }}
          >
            {/* Liquidation text */}
            <div
              className="text-[#ff3333] text-6xl font-['Press_Start_2P']"
              style={{
                animation: 'liquidationTextAnimation 0.8s ease-out forwards',
                textShadow: '0 0 10px #ff3333, 0 0 20px #ff3333'
              }}
            >
              LIQUIDATED!
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnimationOverlays;