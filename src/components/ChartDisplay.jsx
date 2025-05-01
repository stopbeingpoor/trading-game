import React, { forwardRef } from 'react';

// Using forwardRef to allow the parent to pass down the chartRef
const ChartDisplay = forwardRef(({
  position,
  currentPrice,
  entryPrice,
  walletBalance,
  pnl,
  leverage,
  liquidationPrice,
  chartData,
  visibleRange,
  chartZoom,
  chartOffset,
  // followingLatest, // Not directly used in JSX, but handlers might need it
  formatPrice,
  formatPnl,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleZoom,
  getPricePosition, // Needed for rendering lines/candles
  // Removed props for mobile controls toggle: showMobileControls, toggleMobileControls
}, ref) => { // Receive the ref from forwardRef

  return (
    <div className="md:col-span-3 pixel-container p-2 flex flex-col h-full">
      {/* Price/Position Info Bar */}
      <div className="flex items-center gap-4 mb-1">
        {position ? (
          <>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[rgba(0,255,0,0.1)] px-2 py-1 border border-[#333] rounded">
                <span className="opacity-70">Price:</span>
                <span className="font-bold text-[var(--pixel-text)]">${formatPrice(currentPrice)}</span>
              </div>
              <div className="text-lg font-bold border-l-2 border-[#333] pl-4">CURRENT POSITION</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="opacity-70">Type:</span>
                <span className={position === 'buy' ? 'text-[var(--pixel-primary)]' : 'text-[var(--pixel-secondary)]'}>
                  {position === 'buy' ? 'LONG' : 'SHORT'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="opacity-70">Entry:</span>
                <span>{formatPrice(entryPrice || 0)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="opacity-70">Size:</span>
                {/* Calculate initial balance for size display */}
                <span>${(walletBalance - pnl).toLocaleString()}</span>
                <span className="opacity-70 text-sm">@{leverage}x</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="opacity-70">Margin:</span>
                 {/* Calculate initial balance for margin display */}
                <span>${(walletBalance - pnl).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="opacity-70">PNL:</span>
                <span className={pnl >= 0 ? 'text-[var(--pixel-primary)]' : 'text-[var(--pixel-secondary)]'}>
                  {formatPnl(pnl)}
                </span>
              </div>
              {liquidationPrice && (
                <div className="flex items-center gap-1">
                  <span className="text-[#ff3333]">Liquidation:</span>
                  <span className="text-[#ff3333] font-bold">${formatPrice(liquidationPrice)}</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[rgba(0,255,0,0.1)] px-2 py-1 border border-[#333] rounded">
              <span className="opacity-70">Price:</span>
              <span className="font-bold text-[var(--pixel-text)]">${formatPrice(currentPrice)}</span>
            </div>
            <div className="text-lg opacity-70">NO POSITION</div>
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div className="relative flex-1 bg-[var(--pixel-bg)] pixel-container overflow-hidden min-h-[200px]"
           ref={ref} // Apply the forwarded ref here
           onMouseDown={handleMouseDown}
           onMouseMove={handleMouseMove}
           onMouseUp={handleMouseUp}>

        {/* Zoom controls */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
          <button
            className="pixel-button w-8 h-8 flex items-center justify-center text-lg"
            onClick={() => handleZoom('in')}
          >
            +
          </button>
          <button
            className="pixel-button w-8 h-8 flex items-center justify-center text-lg"
            onClick={() => handleZoom('out')}
          >
            -
          </button>
        </div>

        {/* SVG Chart */}
        <svg
          viewBox={`${chartOffset} 0 ${100/chartZoom} 100`}
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={`grid-${y}`}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#1a1a1a"
              strokeWidth="0.1"
            />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={`grid-vertical-${i}`}
              x1={i * (100/15)}
              y1="0"
              x2={i * (100/15)}
              y2="100"
              stroke="#1a1a1a"
              strokeWidth="0.1"
            />
          ))}

          {/* Candlesticks */}
          {chartData.slice(visibleRange.start, visibleRange.end).map((candle, i) => {
            const width = 4;
            const x = i * (100 / 15);
            const openY = getPricePosition(candle.open);
            const closeY = getPricePosition(candle.close);
            const highY = getPricePosition(candle.high);
            const lowY = getPricePosition(candle.low);
            const isUp = candle.close >= candle.open;

            return (
              <g key={`candle-${visibleRange.start + i}`} className={isUp ? 'candle-up' : 'candle-down'}>
                <line
                  x1={x + width/2}
                  y1={highY}
                  x2={x + width/2}
                  y2={lowY}
                  strokeWidth="0.5"
                />
                <rect
                  x={x + 0.5}
                  y={Math.min(openY, closeY)}
                  width={width - 1}
                  height={Math.max(Math.abs(closeY - openY), 1)}
                />
              </g>
            );
          })}

          {/* Entry line */}
          {position && entryPrice && (
              <line
                x1="0"
                y1={getPricePosition(entryPrice)}
                x2="100"
                y2={getPricePosition(entryPrice)}
                stroke={position === 'buy' ? '#00ff00' : '#ff3333'}
                strokeWidth="0.8"
                strokeDasharray="2,1"
              />
          )}
        </svg>

        {/* Empty div to maintain structure but without labels */}
        <div className="absolute top-0 left-0 h-full w-full pointer-events-none">
        </div>

        {/* Position label */}
        {position && (
          <div className="absolute top-12 left-4 pixel-container p-2 text-sm bg-[var(--pixel-bg)] border border-[var(--pixel-text)] z-10">
            <span className={position === 'buy' ? 'text-[var(--pixel-primary)]' : 'text-[var(--pixel-secondary)]'}>
              {/* Calculate initial balance for size display */}
              {position === 'buy' ? 'LONG' : 'SHORT'} ${(walletBalance - pnl).toLocaleString()}
            </span>
          </div>
        )}

        {/* PNL display */}
        {position && (
          <div className={`absolute bottom-4 right-4
            text-white ${pnl >= 0 ? 'bg-[#00ff00]' : 'bg-red-600'} px-3 py-1.5 text-[8px] font-['Press_Start_2P'] border ${pnl >= 0 ? 'border-[#00cc00]' : 'border-red-700'}`}>
            {formatPnl(pnl)}
          </div>
        )}
      </div>

      {/* Removed Mobile toggle button */}
    </div>
  );
});

export default ChartDisplay;