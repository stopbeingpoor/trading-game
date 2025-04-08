import React from 'react';

const AnimationOverlays = ({
  showProfitAnimation,
  showLossAnimation,
  showLiquidationAnimation,
}) => {
  return (
    <>
      {/* Profit/Loss Animation Overlay */}
      <div className={`animation-overlay ${showProfitAnimation ? 'animate-profit-screen' : ''} ${showLossAnimation ? 'animate-loss-screen' : ''}`} />

      {/* Liquidation Animation Overlay */}
      {showLiquidationAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
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