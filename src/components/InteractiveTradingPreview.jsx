import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameHeader from './GameHeader'; // Import the new component
import ChartDisplay from './ChartDisplay'; // Import the chart component
import TradingPanel from './TradingPanel'; // Import the controls panel component
import TradingActions from './TradingActions'; // Import the actions footer component
import GameOver from './GameOver'; // Import the game over component
import AnimationOverlays from './AnimationOverlays'; // Import the animation overlays component

const InteractiveTradingPreview = ({ selectedCharacter }) => { // Accept selectedCharacter prop
  // Add CSS keyframes for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes traderShake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
      }
      
      @keyframes traderPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      @keyframes glow {
        0% { box-shadow: 0 0 2px #00ff00; }
        50% { box-shadow: 0 0 5px #00ff00; }
        100% { box-shadow: 0 0 2px #00ff00; }
      }

      @keyframes heartbeat {
        0% { transform: scale(1); }
        15% { transform: scale(1.15); }
        30% { transform: scale(1); }
        45% { transform: scale(1.15); }
        60% { transform: scale(1); }
      }

      @keyframes brainPulse {
        0% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-5deg); }
        50% { transform: scale(1) rotate(0deg); }
        75% { transform: scale(1.1) rotate(5deg); }
        100% { transform: scale(1) rotate(0deg); }
      }

      @keyframes sliderGlow {
        0% { box-shadow: 0 0 2px #00ff00, 0 0 4px #00ff00; }
        50% { box-shadow: 0 0 4px #00ff00, 0 0 8px #00ff00; }
        100% { box-shadow: 0 0 2px #00ff00, 0 0 4px #00ff00; }
      }

      @keyframes trackPulse {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }

      @keyframes valueFlicker {
        0% { opacity: 1; }
        95% { opacity: 1; }
        96% { opacity: 0.4; }
        97% { opacity: 1; }
        98% { opacity: 0.4; }
        100% { opacity: 1; }
      }

      @keyframes neonPulse {
        0%, 100% {
          box-shadow: 0 0 2px #00ff00,
                    0 0 4px #00ff00;
        }
        50% {
          box-shadow: 0 0 4px #00ff00,
                    0 0 8px #00ff00;
        }
      }

      @keyframes scanline {
        0% {
          transform: translateY(-100%);
        }
        100% {
          transform: translateY(100%);
        }
      }

      @keyframes glitch {
        0% { transform: translate(0) }
        20% { transform: translate(-1px, 1px) }
        40% { transform: translate(-1px, -1px) }
        60% { transform: translate(1px, 1px) }
        80% { transform: translate(1px, -1px) }
        100% { transform: translate(0) }
      }
      
      @keyframes screenShake {
        0% { transform: translate(0, 0) rotate(0deg); }
        10% { transform: translate(-10px, -10px) rotate(-1deg); }
        20% { transform: translate(10px, 10px) rotate(1deg); }
        30% { transform: translate(-10px, 10px) rotate(0deg); }
        40% { transform: translate(10px, -10px) rotate(1deg); }
        50% { transform: translate(-10px, 0px) rotate(-1deg); }
        60% { transform: translate(10px, 5px) rotate(0deg); }
        70% { transform: translate(-10px, -5px) rotate(1deg); }
        80% { transform: translate(0, 10px) rotate(-1deg); }
        90% { transform: translate(-5px, -10px) rotate(0deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
      
      @keyframes screenFlash {
        0% { background-color: rgba(255, 0, 0, 0); }
        25% { background-color: rgba(255, 0, 0, 0.8); }
        100% { background-color: rgba(255, 0, 0, 0); }
      }
      
      @keyframes liquidationTextAnimation {
        0% { transform: scale(0.1); opacity: 0; }
        50% { transform: scale(1.2); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }

      .cyber-slider-container {
        position: relative;
        padding: 4px;
        background: linear-gradient(45deg, #000000, #1a1a1a);
        border: 1px solid #00ff00;
        border-radius: 2px;
        overflow: hidden;
      }

      .cyber-slider-container::before {
        display: none; /* Remove scanline animation */
      }

      .cyber-slider-container::after {
        display: none; /* Remove track pulse animation */
      }

      .retro-slider {
        -webkit-appearance: none;
        height: 20px;
        background: rgba(0, 255, 0, 0.1);
        border: none;
        outline: none;
        opacity: 0.8;
        transition: opacity 0.2s ease;
      }

      .retro-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 24px;
        height: 24px;
        background: #000;
        border: 1px solid #00ff00;
        cursor: pointer;
        position: relative;
        border-radius: 2px;
        transition: transform 0.2s ease, background-color 0.2s ease;
      }

      .retro-slider::-webkit-slider-thumb:hover {
        transform: scale(1.1);
        background: rgba(0, 255, 0, 0.2);
      }

      .retro-slider::-webkit-slider-runnable-track {
        height: 20px;
        background: rgba(0, 255, 0, 0.05);
      }

      .slider-value {
        font-family: 'Press Start 2P', monospace;
        color: #00ff00;
        text-shadow: 0 0 2px #00ff00;
        padding: 2px 8px;
        background: rgba(0, 255, 0, 0.1);
        border: 1px solid #00ff00;
        display: inline-block;
      }

      .slider-label {
        position: relative;
        padding-left: 15px;
        font-family: 'Press Start 2P', monospace;
        color: #00ff00;
        text-shadow: 0 0 2px #00ff00;
      }

      .slider-label::before {
        content: '>';
        position: absolute;
        left: 0;
      }

      .high-leverage-warning .retro-slider::-webkit-slider-thumb {
        border-color: #ff3333;
        background: rgba(255, 51, 51, 0.1);
      }

      .high-leverage-warning {
        border-color: #ff3333;
      }

      .high-leverage-warning .slider-value {
        color: #ff3333;
        text-shadow: 0 0 2px #ff3333;
        border-color: #ff3333;
      }

      .disabled-slider {
        opacity: 0.5;
        filter: grayscale(50%);
      }

      .disabled-slider .slider-value,
      .disabled-slider .slider-label {
        opacity: 0.7;
      }

      .retro-progress {
        position: relative;
        height: 24px;
        background: #000;
        border: 2px solid #333;
        overflow: hidden;
      }

      .retro-progress::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        right: 2px;
        height: 2px;
        background: rgba(255, 255, 255, 0.1);
      }

      .retro-progress-bar {
        height: 100%;
        transition: width 0.3s ease, background-color 0.3s ease;
      }

      .retro-progress-bar.health {
        background: linear-gradient(to right, #ff3333, #00ff00);
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
      }

      .retro-progress-bar.sanity {
        background: linear-gradient(to right, #ff3333, #ffcc00, #00ff00);
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
      }

      .status-label {
        font-family: 'Press Start 2P', monospace;
        font-size: 12px;
        text-shadow: 0 0 2px rgba(0, 255, 0, 0.5);
      }

      .heart-icon {
        animation: heartbeat 1s infinite;
        color: #ff3333;
        text-shadow: 0 0 4px rgba(255, 51, 51, 0.8);
      }

      .leverage-warning {
        color: #ff3333;
        text-shadow: 0 0 2px rgba(255, 51, 51, 0.8);
        animation: glow 1s infinite;
      }

      .brain-icon {
        animation: brainPulse 2s infinite;
        color: #00ff00;
        text-shadow: 0 0 4px rgba(0, 255, 0, 0.8);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Calculate liquidation price based on points and $10/point PNL
  const calculateLiquidationPrice = (type, entry, initialMargin, leverageUsed) => {
    // Ensure initialMargin is positive and leverage is valid
    if (initialMargin <= 0 || leverageUsed <= 0) {
        console.error("Cannot calculate liquidation price with zero or negative margin/leverage.", { initialMargin, leverageUsed });
        return null;
    }

    const pnlPerPoint = 10;
    // Liquidation occurs when loss = initialMargin
    // Loss = abs(pointDifference) * pnlPerPoint * leverageUsed
    // initialMargin = abs(pointDifference) * pnlPerPoint * leverageUsed
    // abs(pointDifference) = initialMargin / (pnlPerPoint * leverageUsed)
    const maxLossPoints = initialMargin / (pnlPerPoint * leverageUsed);

    let liqPrice;
    if (type === 'buy') {
      // Price needs to drop by maxLossPoints from entry
      liqPrice = entry - maxLossPoints;
    } else { // type === 'sell'
      // Price needs to rise by maxLossPoints from entry
      liqPrice = entry + maxLossPoints;
    }
    // Clamp liquidation price within the 0-9999 range
    return Math.max(0, liqPrice); // Remove 9999 clamp
  };

  // Helper function to calculate True Range (Memoized)
  const calculateTrueRange = useCallback((candle, prevCandle) => {
    if (!prevCandle) return candle.high - candle.low; // Handle first candle
    const highLow = candle.high - candle.low;
    const highPrevClose = Math.abs(candle.high - prevCandle.close);
    const lowPrevClose = Math.abs(candle.low - prevCandle.close);
    return Math.max(highLow, highPrevClose, lowPrevClose);
  }, []);

  // Helper function to calculate Average True Range (ATR) (Memoized)
  const calculateATR = useCallback((data, period = 14) => {
    if (data.length < period) return null; // Not enough data

    let trSum = 0;
    const trueRanges = [];

    // Calculate initial True Ranges and sum for the first ATR
    // We need data going back period + 1 candles to calculate TR for the first candle in the period
    const startIndex = Math.max(0, data.length - period -1);
    for (let i = startIndex + 1; i < data.length; i++) {
       const candle = data[i];
       const prevCandle = data[i - 1]; // Should always exist given startIndex logic
       const tr = calculateTrueRange(candle, prevCandle); // Use memoized version
       trueRanges.push(tr);
    }

    // Calculate the first ATR (simple average of first 'period' TRs)
    // Ensure we have enough true ranges calculated
    if (trueRanges.length < period) return null;
    trSum = trueRanges.slice(-period).reduce((sum, val) => sum + val, 0);
    let atr = trSum / period;

    // Note: For a more accurate ATR in a live scenario, you'd typically smooth it
    // over the entire history. For this simulation, calculating based on the
    // last 'period' candles on each update is a reasonable approximation.
    // A more robust implementation would store previous ATR values.
    return atr;
  }, [calculateTrueRange]); // Dependency on memoized calculateTrueRange

  // Helper function to find Support and Resistance levels (Memoized)
  const findSupportResistance = useCallback((data, lookbackPeriod = 50) => {
    if (data.length < lookbackPeriod) {
      // Not enough data, return wide defaults or null
      return { support: null, resistance: null };
    }

    const relevantData = data.slice(-lookbackPeriod);
    let lowestLow = Infinity;
    let highestHigh = -Infinity;

    relevantData.forEach(candle => {
      lowestLow = Math.min(lowestLow, candle.low);
      highestHigh = Math.max(highestHigh, candle.high);
    });

     // Avoid returning Infinity if data was somehow invalid
    if (lowestLow === Infinity || highestHigh === -Infinity) {
        return { support: null, resistance: null };
    }

    return { support: lowestLow, resistance: highestHigh };
  }, []);

  // Generate initial chart data (Memoized)
  const generateInitialData = useCallback(() => {
    const data = [];
    let price = 5000; // Starting price in points
    let momentum = 0; // Still -1 to 1
    let volatility = 20; // Initial volatility in points (e.g., ATR equivalent)
    let trendStrength = 0; // Still 0 to 1
    
    // Generate 100 candles for historical data
    for (let i = 0; i < 100; i++) {
      // Update trend strength (0-1)
      trendStrength = Math.max(0, Math.min(1, trendStrength + (Math.random() - 0.5) * 0.1));
      
      // Update momentum (-1 to 1)
      momentum = momentum * 0.95 + (Math.random() - 0.5) * 0.1;
      
      // Dynamic volatility based on recent trend strength
      // Dynamic volatility based on recent trend strength - now in points
      volatility = 15 + (trendStrength * 15); // Base 15 points + trend influence
      
      // 3% chance of a market crash or pump
      const isExtremeMove = Math.random() < 0.03;
      if (isExtremeMove) {
        volatility *= 4;
        momentum = (Math.random() < 0.7 ? -1 : 1) * Math.random(); // Strong directional bias
      }
      
      // Calculate price change in points
      const trendBias = momentum * volatility * 0.5; // Momentum effect in points
      const randomComponent = (Math.random() * 2 - 1) * volatility; // Random fluctuation in points
      const change = trendBias + randomComponent; // Total change in points

      const open = price;
      let potentialPrice = open + change; // Calculate potential next price

      const reversionThreshold = 9500;
      const reversionStrength = 0.1; // Adjust this factor to control how strongly it reverts

      if (potentialPrice > reversionThreshold) {
        const overshoot = potentialPrice - reversionThreshold;
        const reversionAdjustment = overshoot * reversionStrength;
        potentialPrice -= reversionAdjustment; // Apply downward pressure
      }

      // Remove the 9999 clamp, keep the 0 clamp
      price = Math.max(0, potentialPrice);
      
      // Generate more natural wicks
      // Generate wicks based on volatility (absolute points)
      const wickVolatility = volatility * 0.75; // Wicks are related to volatility
      const upperWickSize = Math.random() * wickVolatility;
      const lowerWickSize = Math.random() * wickVolatility;
      
      const high = Math.max(open, price) + upperWickSize;
      const low = Math.min(open, price) - lowerWickSize;
      
      data.push({
        time: Date.now() - (100 - i) * 1000,
        open,
        high,
        low,
        close: price,
        volume: Math.floor(Math.random() * 1000) * (1 + trendStrength * 2)
      });
      
      // Update trend strength based on relative price movement compared to volatility
      if (Math.abs(change) > volatility * 0.8) { // If change was significant relative to volatility
        trendStrength = Math.min(1, trendStrength + 0.1);
      } else {
        trendStrength *= 0.95; // Decay trend strength otherwise
      }
    }
    
    return data;
  }, []);

  // Update chart with new data (Memoized)
const [chartData, setChartData] = useState([]);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 15 });
  const [currentPrice, setCurrentPrice] = useState(5000); // Start price in points
  const updateChart = useCallback(() => {
    setChartData(data => {
      if (data.length === 0) return generateInitialData(); // Should ideally not happen if timer starts after init
      
      const lastCandle = data[data.length - 1];
      const open = lastCandle.close;
      
      // Get recent price movement (still using relative for momentum calculation)
      const recentCandles = data.slice(-5);
      const priceChanges = recentCandles.map((c, i) =>
        i > 0 ? (c.close - recentCandles[i-1].close) / recentCandles[i-1].close : 0
      );
      
      // Calculate momentum from recent moves
      const momentum = priceChanges.reduce((sum, change) => sum + change, 0) / priceChanges.length;
      
      // Calculate ATR for volatility
      const atrPeriod = 14;
      const currentATR = calculateATR(data, atrPeriod);
      
      // Use ATR directly as volatility in points, fallback if not available
      let volatility = currentATR ?? 20; // Use calculated ATR in points, or default 20 points
      
      // 3% chance of extreme move
      const isExtremeMove = Math.random() < 0.03;
      if (isExtremeMove) {
        volatility *= 4;
        // Bias towards continuing recent trend during extreme moves
        if (momentum !== 0) {
           // Apply bias directionally, but keep volatility positive for magnitude calculation
           volatility = Math.abs(volatility); // Ensure volatility is positive
           // We'll use momentum sign later in trendBias
        }
      }
      
      // --- Support & Resistance Logic ---
      const srLookback = 50;
      const { support, resistance } = findSupportResistance(data, srLookback);
      let srInfluence = 0; // Factor to adjust the change based on S/R proximity (in points)
      const proximityThreshold = volatility * 0.5; // How close (in points) to S/R to trigger influence
      if (resistance && open > resistance - proximityThreshold) {
        // Near resistance: Increase downward pressure
        const distanceFactor = Math.max(0, 1 - (resistance - open) / proximityThreshold); // 0 far, 1 at level
        srInfluence = -volatility * distanceFactor * (0.5 + Math.random() * 0.5); // Random downward push in points
        // console.log(`Near Resistance (${resistance.toFixed(1)}). Influence: ${srInfluence.toFixed(4)}`); // Removed log
      } else if (support && open < support + proximityThreshold) {
        // Near support: Increase upward pressure
        const distanceFactor = Math.max(0, 1 - (open - support) / proximityThreshold); // 0 far, 1 at level
        srInfluence = volatility * distanceFactor * (0.5 + Math.random() * 0.5); // Random upward push in points
        // console.log(`Near Support (${support.toFixed(1)}). Influence: ${srInfluence.toFixed(4)}`); // Removed log
      }
      // --- End S/R Logic ---


      // Calculate price change in points with momentum and S/R influence
      const trendBias = momentum * volatility * 0.5; // Momentum effect in points (adjust multiplier as needed)
      const randomComponent = (Math.random() * 2 - 1) * volatility; // Random fluctuation in points
      let change = trendBias + randomComponent + srInfluence; // Total change in points

      // Ensure change isn't excessively large compared to volatility (sanity check)
      change = Math.max(-volatility * 3, Math.min(volatility * 3, change));

      let potentialClose = open + change; // Calculate potential close price

      const reversionThreshold = 9500; // Using the same threshold and strength
      const reversionStrength = 0.1;

      if (potentialClose > reversionThreshold) {
        const overshoot = potentialClose - reversionThreshold;
        const reversionAdjustment = overshoot * reversionStrength;
        potentialClose -= reversionAdjustment; // Apply downward pressure
      }

      const close = Math.max(0, potentialClose); // Remove 9999 clamp, keep 0 clamp
      
      // Generate natural wicks based on volatility (absolute points)
      const wickVolatility = volatility * 0.75; // Wicks are related to volatility
      const upperWickSize = Math.random() * wickVolatility;
      const lowerWickSize = Math.random() * wickVolatility;
      
      const high = Math.max(open, close) + upperWickSize;
      const low = Math.min(open, close) - lowerWickSize;
      
      const newCandle = {
        time: Date.now(),
        open,
        high: high, // Remove 9999 clamp
        low: Math.max(0, low),     // Clamp low
        close,
        volume: Math.floor(Math.random() * 1000) * (1 + Math.abs(momentum) * 2)
      };
      
      // Update current price state
      setCurrentPrice(close);
      
      // Keep up to 100 candles in history
      const updatedData = [...data.slice(-99), newCandle];
      
      // Update visible range only if following the latest candle
      if (followingLatestRef.current) { // Use ref here as state might be stale inside callback
        setVisibleRange({
          start: Math.max(0, updatedData.length - 15),
          end: updatedData.length
        });
      }
      // If not following latest, do nothing here - let user interaction control the range
      
      return updatedData;
    });
  }, [generateInitialData, calculateATR, findSupportResistance, setCurrentPrice, setVisibleRange, setChartData]); // Removed followingLatest, setChartData, setCurrentPrice as they are setters or stable refs

  // Game states
  const [position, setPosition] = useState(null);
  const [entryPrice, setEntryPrice] = useState(null);
  const [pnl, setPnl] = useState(0);
  const [totalPnl, setTotalPnl] = useState(0);
  const [walletBalance, setWalletBalance] = useState(10000); // Starting balance $10k
  const [tradeHistory, setTradeHistory] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [sanity, setSanity] = useState(8);
  const [heartRate, setHeartRate] = useState(80);
  const [emotion, setEmotion] = useState('neutral');
  const [leverage, setLeverage] = useState(1);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const [chartZoom, setChartZoom] = useState(1);
  const [chartOffset, setChartOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [followingLatest, setFollowingLatest] = useState(true);
  const [liquidationPrice, setLiquidationPrice] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLiquidated, setIsLiquidated] = useState(false);
  const [liquidationDetails, setLiquidationDetails] = useState(null);
  const [showLiquidationAnimation, setShowLiquidationAnimation] = useState(false);
  const [showProfitAnimation, setShowProfitAnimation] = useState(false); // State for profit animation
  const [showLossAnimation, setShowLossAnimation] = useState(false); // State for loss animation
  const [initialMargin, setInitialMargin] = useState(0); // <-- ADDED: Store margin at trade entry

  const chartRef = useRef(null);
  const followingLatestRef = useRef(followingLatest); // Ref to track current value
  const intervalRef = useRef(null); // <-- ADDED: Ref for the timer interval
  const timeElapsedRef = useRef(timeElapsed); // <-- ADDED: Ref for time tracking in interval

  // Effect for Initialization
  useEffect(() => {
    // Initialize chart data only if it's empty
    if (chartData.length === 0) {
      const initialData = generateInitialData();
      setChartData(initialData);
      // Set initial current price
      if (initialData.length > 0) {
        setCurrentPrice(initialData[initialData.length - 1].close);
      }
    }
  }, [chartData.length, generateInitialData, setChartData, setCurrentPrice]); // Dependencies for initialization

  // Effect for Timer Interval
  useEffect(() => {
    // Don't start the timer until chart data is initialized
    if (chartData.length === 0) {
      return; // Exit if no data yet
    }

    // Start the chart update interval using a ref
    intervalRef.current = setInterval(() => {
      updateChart(); // Call the memoized update function

      // Update time elapsed using ref and state setter
      const newTime = timeElapsedRef.current + 1;
      setTimeElapsed(newTime); // Update state for UI

      // Check for game over condition (time limit)
      if (newTime >= 120) {
        setIsGameOver(true); // Update game over state
        if (intervalRef.current) {
          clearInterval(intervalRef.current); // Clear interval using ref
        }
      }
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts or dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [chartData.length, updateChart, setTimeElapsed, setIsGameOver]); // Dependencies for the timer

  // Handle liquidation (wrapped in useCallback)
  const handleLiquidation = useCallback(() => {
    // Use the stored initialMargin to calculate the loss
    const marginLoss = -initialMargin;

    console.log(`Liquidation: Losing initial margin of ${initialMargin.toFixed(2)}`);

    // Store liquidation details
    setLiquidationDetails({
      type: position,
      entryPrice: entryPrice,
      liquidationPrice: currentPrice, // Price at the moment of liquidation check
      leverage: leverage,
      marginLost: initialMargin // Store the lost margin
    });

    // Add to trade history with liquidation flag
    setTradeHistory(prev => [
      ...prev,
      {
        type: position,
        entry: entryPrice,
        exit: currentPrice, // Price at liquidation
        pnl: marginLoss, // The actual loss is the negative initial margin
        timestamp: Date.now(),
        liquidated: true
      }
    ]);

    // Update total PNL and set wallet balance to zero
    setTotalPnl(prev => prev + marginLoss);
    setWalletBalance(0); // Wallet is wiped out

    // Reset position state
    setPosition(null);
    setEntryPrice(null);
    setPnl(0);
    setLiquidationPrice(null);
    setInitialMargin(0); // Reset the stored initial margin

    // Emotional response to liquidation
    setEmotion('panicked');
    setSanity(s => Math.round(Math.max(0, s - 1.5) * 10) / 10); // Significant sanity hit
    setHeartRate(prev => Math.min(200, prev + 40)); // Spike heart rate

    // Play liquidation animation
    setShowLiquidationAnimation(true);

    // Set liquidation flag
    setIsLiquidated(true);

    // End the game after animation completes
    // Ensure interval is cleared if game ends here
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
    }
    setTimeout(() => {
      setIsGameOver(true);
      setShowLiquidationAnimation(false);
    }, 2000); // Animation duration
  }, [position, entryPrice, currentPrice, leverage, initialMargin, setLiquidationDetails, setTradeHistory, setTotalPnl, setWalletBalance, setPosition, setEntryPrice, setPnl, setLiquidationPrice, setInitialMargin, setEmotion, setSanity, setHeartRate, setShowLiquidationAnimation, setIsLiquidated, setIsGameOver]); // Added dependencies

  // Update PNL calculation and trader state
  const updatePnl = useCallback(() => {
    // Ensure we have an active position, entry price, and valid initial margin
    if (!position || !entryPrice || initialMargin <= 0) return;

    const latestPrice = chartData[chartData.length - 1]?.close || currentPrice;
    const pointDifference = latestPrice - entryPrice;
    const pnlPerPoint = 10; // $10 PNL per point change

    let newPnl;
    if (position === 'buy') {
      // PNL = (Points Gained) * $10 * Leverage
      newPnl = pointDifference * pnlPerPoint * leverage;
    } else { // position === 'sell'
      // PNL = -(Points Lost) * $10 * Leverage
      newPnl = -pointDifference * pnlPerPoint * leverage;
    }

    setPnl(newPnl);

    // Update wallet balance based on the stored initial margin and current PNL
    setWalletBalance(initialMargin + newPnl);

    // Check for liquidation against the stored initialMargin
    // Use a small tolerance for floating point comparisons
    console.log("PnL Check (Points):", {
      newPnl: newPnl.toFixed(2),
      initialMargin: initialMargin.toFixed(2), // Use initialMargin
      pointDifference: pointDifference.toFixed(2),
      position,
      leverage,
      condition: newPnl <= -initialMargin
    });

    if (newPnl <= -(initialMargin - 0.01)) {
      console.log("LIQUIDATION TRIGGERED - Negative PnL exceeds initial margin");
      handleLiquidation(); // handleLiquidation will use initialMargin
      return; // Stop further updates if liquidated
    }

    // Calculate PNL percentage relative to initial margin for emotion/heart rate logic
    const pnlPercentage = (newPnl / initialMargin) * 100;

    // Update heart rate based on PNL and leverage
    const baseHeartRate = 75;
    const pnlEffect = Math.abs(pnlPercentage) * 0.5;
    const leverageEffect = (leverage / 100) * 30;
    const positionEffect = position ? 15 : 0; // Simplified: 15 if in position, 0 otherwise

    let newHeartRate = Math.round(baseHeartRate + pnlEffect + leverageEffect + positionEffect);
    newHeartRate += Math.round(Math.random() * 5 - 2); // Random fluctuations
    newHeartRate = Math.min(200, Math.max(60, newHeartRate)); // Clamp heart rate
    setHeartRate(newHeartRate);

    // Update emotions based on PNL relative to initial margin
    let newEmotion = 'neutral';
    if (newPnl < -initialMargin * 0.5) {
      newEmotion = 'panicked';
      setSanity(s => Math.round(Math.max(0, s - 0.2) * 10) / 10);
    } else if (newPnl < -initialMargin * 0.2) {
      newEmotion = 'stressed';
      setSanity(s => Math.round(Math.max(0, s - 0.1) * 10) / 10);
    } else if (newPnl > initialMargin * 0.3) {
      newEmotion = 'euphoric';
      setSanity(s => Math.round(Math.min(8, s + 0.05) * 10) / 10);
    } else if (newPnl > initialMargin * 0.15) {
      newEmotion = 'happy';
    }

    // Additional trigger for high leverage insanity
    if (leverage > 50 && Math.abs(pnlPercentage) > 10) {
      newEmotion = 'insane';
      setSanity(s => Math.round(Math.max(0, s - 0.15) * 10) / 10);
    }

    setEmotion(newEmotion);

  }, [position, entryPrice, initialMargin, chartData, currentPrice, leverage, handleLiquidation, setPnl, setWalletBalance, setHeartRate, setEmotion, setSanity]); // Updated dependencies

  // Update PNL when relevant states change
  useEffect(() => {
    // Call updatePnl directly if conditions are met
    if (position && entryPrice && chartData.length > 0 && initialMargin > 0) {
      updatePnl();
    }
    // Note: PNL reset is handled within handleClose and handleLiquidation when position ends
  }, [position, entryPrice, chartData, initialMargin, updatePnl]); // Dependencies for triggering PNL update
  
  // Handle close with enhanced trader responses
  const handleClose = () => {
    if (!position || !entryPrice) return;
    
    const latestPrice = currentPrice;
    const finalPnl = pnl; // Use the last calculated PNL state

    // Trigger profit/loss animations
    if (finalPnl > 0) {
      setShowProfitAnimation(true);
      setTimeout(() => setShowProfitAnimation(false), 800); // Duration matches CSS animation
    } else if (finalPnl < 0) {
      setShowLossAnimation(true);
      setTimeout(() => setShowLossAnimation(false), 800); // Duration matches CSS animation
    }
    
    // Add to trade history
    setTradeHistory(prev => [
      ...prev, 
      {
        type: position,
        entry: entryPrice,
        exit: latestPrice,
        pnl: finalPnl,
        timestamp: Date.now()
      }
    ]);
    
    // Update total PNL only (wallet balance is already updated in real-time via updatePnl)
    setTotalPnl(prev => prev + finalPnl);
    
    // Reset position state
    setPosition(null);
    setEntryPrice(null);
    setPnl(0);
    setInitialMargin(0); // Reset initial margin
    setLiquidationPrice(null); // Clear liquidation price
    
    // Emotional response to trade result
    if (finalPnl > 0) {
      setEmotion('happy');
      setSanity(s => Math.round(Math.min(8, s + 0.3) * 10) / 10);
      setHeartRate(prev => Math.max(60, prev - 10));
    } else {
      setEmotion('stressed');
      setSanity(s => Math.round(Math.max(0, s - 0.3) * 10) / 10);
      setHeartRate(prev => Math.min(200, prev + 20));
    }
    
    // Return to neutral state after a delay
    setTimeout(() => {
      setEmotion('neutral');
      setHeartRate(prev => Math.max(75, prev - 15));
    }, 2000);
  };
  
  // Format price
  const formatPrice = (price) => {
    // Display price points with 1 decimal place
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(price);
  };
  
  // Format PNL
  const formatPnl = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      signDisplay: 'always',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format time
  const formatTime = (seconds) => {
    const totalSeconds = 120; // 2 minutes game time
    const remainingSeconds = Math.max(0, totalSeconds - seconds);
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate chart scaling for visible range
  const getChartScaling = () => {
    if (chartData.length === 0) return { min: 4500, max: 5500 }; // Default scaling around start price
    
    const visibleData = chartData.slice(visibleRange.start, visibleRange.end);
    
    let min = Infinity, max = -Infinity;
    visibleData.forEach(candle => {
      min = Math.min(min, candle.low);
      max = Math.max(max, candle.high);
    });
    
    // Increase padding for better visualization
    const range = max - min;
    const padding = range * 0.3; // 30% padding
    
    // Ensure min and max are different enough for good scaling, use absolute points
    const minRange = 50; // Minimum point range to display
    if (range < minRange) {
      const midPoint = (max + min) / 2;
      min = midPoint - (minRange / 2);
      max = midPoint + (minRange / 2);
    }
    
    // If we have a position, ensure entry price is visible with some margin
    if (position && entryPrice) {
       const entryPadding = range * 0.1; // Smaller padding around entry price
       min = Math.min(min, entryPrice - entryPadding);
       max = Math.max(max, entryPrice + entryPadding);
    }
    
    // Apply the larger padding calculated earlier
    let finalMin = min - padding;
    let finalMax = max + padding;

    // Clamp final scaling within reasonable bounds if needed (optional)
    // finalMin = Math.max(0, finalMin);
    // finalMax = Math.min(9999, finalMax);

    return { min: finalMin, max: finalMax };
  };
  
  // Get price position on chart (0-100%)
  const getPricePosition = (price) => {
    const { min, max } = getChartScaling();
    // Avoid division by zero if min and max are the same
    if (max - min === 0) return 50; 
    return 100 - ((price - min) / (max - min) * 100);
  };
  
  // Handle buy with enhanced trader responses
  const handleBuy = () => {
    if (position === 'buy') return;
    
    const latestPrice = currentPrice;
    
    // Close existing position if any
    if (position) {
      handleClose();
    }
    
    // Use the entire wallet balance as the position size (margin)
    const currentMargin = walletBalance; // Use current balance as margin

    // Check if margin is sufficient (e.g., > 0)
    if (currentMargin <= 0) {
        console.error("Cannot open position with zero or negative balance.");
        // Optionally show a user message
        return;
    }

    setInitialMargin(currentMargin); // <-- ADDED: Store the margin used
    setPosition('buy');
    setEntryPrice(latestPrice);
    setPnl(0); // Reset PNL when opening new position

    // Calculate and set liquidation price using the actual margin
    const liqPrice = calculateLiquidationPrice('buy', latestPrice, currentMargin, leverage);
    setLiquidationPrice(liqPrice);
    
    // Immediate emotional response to taking a position
    setHeartRate(prev => Math.min(200, prev + 15));
    // Sanity decline based on trading type and game over check
    let decrement = 0;
    if (selectedCharacter.name === 'Stoic') decrement = 0.5;
    else if (selectedCharacter.name === 'Nervous Newbie') decrement = 1;
    else if (selectedCharacter.name === 'Full Degen') decrement = 1.5;

    setSanity(prevSanity => {
      const newSanity = Math.round(Math.max(0, prevSanity - decrement) * 10) / 10;
      if (newSanity <= 0 && !isGameOver) { // Check !isGameOver to prevent multiple triggers
        setIsGameOver(true); // Trigger game over if sanity reaches zero
        if (intervalRef.current) { // Stop timer if game over
          clearInterval(intervalRef.current);
        }
      }
      return newSanity;
    });
    
    // Brief emotional response
    setEmotion('excited');
    setTimeout(() => {
      // Ensure still in position before updating PNL
      if (position === 'buy') {
        updatePnl();
      }
    }, 1000); // Update PNL shortly after opening
  };
  
  // Handle sell with enhanced trader responses
  const handleSell = () => {
    if (position === 'sell') return;
    
    const latestPrice = currentPrice;
    
    // Close existing position if any
    if (position) {
      handleClose();
    }
    
    // Use the entire wallet balance as the position size (margin)
    const currentMargin = walletBalance; // Use current balance as margin

    // Check if margin is sufficient (e.g., > 0)
    if (currentMargin <= 0) {
        console.error("Cannot open position with zero or negative balance.");
        // Optionally show a user message
        return;
    }

    setInitialMargin(currentMargin); // <-- ADDED: Store the margin used
    setPosition('sell');
    setEntryPrice(latestPrice);
    setPnl(0); // Reset PNL when opening new position

    // Calculate and set liquidation price using the actual margin
    const liqPrice = calculateLiquidationPrice('sell', latestPrice, currentMargin, leverage);
    setLiquidationPrice(liqPrice);
    
    // Immediate emotional response to taking a position
    setHeartRate(prev => Math.min(200, prev + 15));
    // Sanity decline based on trading type and game over check
    let decrement = 0;
    if (selectedCharacter.name === 'Stoic') decrement = 0.5;
    else if (selectedCharacter.name === 'Nervous Newbie') decrement = 1;
    else if (selectedCharacter.name === 'Full Degen') decrement = 1.5;

    setSanity(prevSanity => {
      const newSanity = Math.round(Math.max(0, prevSanity - decrement) * 10) / 10;
      if (newSanity <= 0 && !isGameOver) { // Check !isGameOver to prevent multiple triggers
        setIsGameOver(true); // Trigger game over if sanity reaches zero
        if (intervalRef.current) { // Stop timer if game over
          clearInterval(intervalRef.current);
        }
      }
      return newSanity;
    });
    
    // Brief emotional response
    setEmotion('excited');
    setTimeout(() => {
      // Ensure still in position before updating PNL
      if (position === 'sell') {
        updatePnl();
      }
    }, 1000); // Update PNL shortly after opening
  };
  
  // Get trader emotion emoji with enhanced states
  const getTraderEmoji = () => {
    // Enhanced emoji map with more states
    const emojiMap = {
      'neutral': '😐',
      'happy': '😄',
      'stressed': '😰',
      'panicked': '😱',
      'excited': '🤩',
      'euphoric': '🤑',
      'insane': '🤪'
    };

    // Get the appropriate emoji based on current emotion
    const emoji = emojiMap[emotion] || emojiMap.neutral;
    
    // Enhanced animation styles based on emotion
    let animationStyle = {};
    if (emotion === 'panicked') {
      animationStyle = {
        animation: 'traderShake 0.3s infinite',
        animationTimingFunction: 'ease-in-out'
      };
    } else if (emotion === 'euphoric' || emotion === 'excited') {
      animationStyle = {
        animation: 'traderPulse 0.8s infinite',
        animationTimingFunction: 'ease-in-out'
      };
    } else if (emotion === 'insane') {
      animationStyle = {
        animation: 'traderShake 0.2s infinite, traderPulse 1s infinite',
        animationTimingFunction: 'ease-in-out'
      };
    } else if (emotion === 'happy') {
      animationStyle = {
        animation: 'traderPulse 1.5s infinite',
        animationTimingFunction: 'ease-in-out'
      };
    }
    
    // Enhanced text color based on emotion
    const textColor = 
      emotion === 'panicked' ? '#ff3333' : 
      emotion === 'happy' ? '#00ff00' : 
      emotion === 'stressed' ? '#ffcc00' : 
      emotion === 'euphoric' ? '#00ffff' :
      emotion === 'excited' ? '#ff00ff' :
      emotion === 'insane' ? '#ff3399' :
      '#ffffff';
    
    // Return an enhanced styled emoji container
    return (
      <div className="w-full h-full flex items-center justify-center" 
           style={{ 
             backgroundColor: 'black', 
             border: `2px solid ${textColor}`,
             borderRadius: '4px',
             transition: 'all 0.3s ease'
           }}>
        <span 
          style={{
            fontSize: '2rem',
            color: textColor,
            ...animationStyle
          }}
        >
          {emoji}
        </span>
      </div>
    );
  };
  
  // Toggle mobile controls
  const toggleMobileControls = () => {
    setShowMobileControls(!showMobileControls);
  };

  // Handle zoom
  const handleZoom = (direction) => {
    setChartZoom(prev => {
      const newZoom = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.min(Math.max(newZoom, 0.5), 3); // Limit zoom between 0.5x and 3x
    });
  };

  // Handle chart panning
  const handleMouseDown = (e) => {
    if (e.button === 2) { // Right mouse button
      setIsDragging(true);
      setDragStart({ x: e.clientX, offset: chartOffset });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const diff = (e.clientX - dragStart.x) / chartRef.current.offsetWidth * 100;
      const newOffset = dragStart.offset - diff;
      setChartOffset(Math.min(Math.max(newOffset, 0), (chartZoom - 1) * 100));
      e.preventDefault();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle chart scrolling
  const handleScroll = (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY) * 3; // Scroll 3 candles at a time
    
    setVisibleRange(prev => {
      const newStart = Math.max(0, Math.min(prev.start + delta, chartData.length - 15));
      const newEnd = newStart + 15;
      const isAtLatest = newStart >= chartData.length - 15;
      
      setFollowingLatest(isAtLatest);
      
      return {
        start: newStart,
        end: newEnd
      };
    });
  };

  // Add navigation functions
  const goToPresent = () => {
    const newStart = Math.max(0, chartData.length - 15);
    setVisibleRange({
      start: newStart,
      end: newStart + 15
    });
    setFollowingLatest(true);
  };

  const goToPast = () => {
    setVisibleRange(prev => {
      const newStart = Math.max(0, prev.start - 15);
      const newEnd = newStart + 15;
      setFollowingLatest(false);
      return {
        start: newStart,
        end: newEnd
      };
    });
  };

  // Add event listeners for context menu
  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    return () => {
      if (chart) {
        chart.removeEventListener('contextmenu', (e) => e.preventDefault());
      }
    };
  }, []);

  // Keep the ref updated with the latest state value
  useEffect(() => {
    followingLatestRef.current = followingLatest;
  }, [followingLatest]);

  // <-- ADDED: Keep timeElapsedRef updated -->
  useEffect(() => {
    timeElapsedRef.current = timeElapsed;
  }, [timeElapsed]);
  // <-- END ADDED -->
  
  // Add reset game function
  const resetGame = () => {
    // Clear the interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Reset all game states
    setIsGameOver(false);
    setTimeElapsed(0);
    timeElapsedRef.current = 0; // Reset ref too
    setPosition(null);
    setEntryPrice(null);
    setPnl(0);
    setTotalPnl(0);
    setWalletBalance(10000);
    setTradeHistory([]);
    setSanity(8);
    setHeartRate(80);
    setEmotion('neutral');
    setLeverage(1);
    setLiquidationPrice(null);
    setInitialMargin(0); // Reset initial margin
    setVisibleRange({ start: 0, end: 15 });
    setChartZoom(1);
    setChartOffset(0);
    setFollowingLatest(true);
    followingLatestRef.current = true; // Reset ref too
    
    // Reset liquidation state
    setIsLiquidated(false);
    setLiquidationDetails(null);
    setShowLiquidationAnimation(false);
    
    // Clear chart data last - this will trigger the useEffect to reinitialize
    setChartData([]);
  };

  // Return game over screen if time is up or player is liquidated
  if (isGameOver) {
    return (
      <GameOver
        isLiquidated={isLiquidated}
        liquidationDetails={liquidationDetails}
        walletBalance={walletBalance}
        totalPnl={totalPnl}
        tradeHistory={tradeHistory}
        formatPnl={formatPnl}
        formatPrice={formatPrice}
        resetGame={resetGame} // Pass the reset function
      />
    );
  }

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      {/* Render AnimationOverlays component */}
      <AnimationOverlays
        showProfitAnimation={showProfitAnimation}
        showLossAnimation={showLossAnimation}
        showLiquidationAnimation={showLiquidationAnimation}
      />

      {/* Render GameHeader component */}
      <GameHeader
        character={selectedCharacter}
        walletBalance={walletBalance}
        totalPnl={totalPnl}
        timeElapsed={timeElapsed}
        sanity={sanity}
        formatPnl={formatPnl} // Pass the function
        formatTime={formatTime} // Pass the function
      />

      {/* Main Game Area */}
      {/* Ensure main area takes full width within its flex container */}
      <main
        className="flex-1 w-full grid grid-cols-1 md:grid-cols-4 gap-2 min-h-0 overflow-hidden"
        // Removed temporary border style
      >
        {/* Render ChartDisplay component */}
        <ChartDisplay
          ref={chartRef} // Pass the ref
          position={position}
          currentPrice={currentPrice}
          entryPrice={entryPrice}
          walletBalance={walletBalance}
          pnl={pnl}
          leverage={leverage}
          liquidationPrice={liquidationPrice}
          chartData={chartData}
          visibleRange={visibleRange}
          chartZoom={chartZoom}
          chartOffset={chartOffset}
          formatPrice={formatPrice}
          formatPnl={formatPnl}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          handleScroll={handleScroll}
          goToPast={goToPast}
          goToPresent={goToPresent}
          handleZoom={handleZoom}
          getPricePosition={getPricePosition}
          showMobileControls={showMobileControls}
          toggleMobileControls={toggleMobileControls}
        />

        {/* Render TradingPanel component */}
        <TradingPanel
          position={position}
          walletBalance={walletBalance}
          leverage={leverage}
          setLeverage={setLeverage} // Pass setter function
          heartRate={heartRate}
          getTraderEmoji={getTraderEmoji} // Pass function
          showMobileControls={showMobileControls}
        />
      </main>

      {/* Render TradingActions component */}
      <TradingActions
        position={position}
        leverage={leverage}
        tradeHistory={tradeHistory}
        totalPnl={totalPnl}
        formatPnl={formatPnl}
        handleBuy={handleBuy}
        handleSell={handleSell}
        handleClose={handleClose}
        showMobileControls={showMobileControls}
      />
    </div>
  );
};

export default InteractiveTradingPreview;