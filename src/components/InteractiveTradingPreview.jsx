import React, { useState, useEffect, useRef } from 'react';
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

  // Game states
  const [position, setPosition] = useState(null);
  const [entryPrice, setEntryPrice] = useState(null);
  const [pnl, setPnl] = useState(0);
  const [totalPnl, setTotalPnl] = useState(0);
  const [walletBalance, setWalletBalance] = useState(10000); // Starting balance $10k
  const [tradeHistory, setTradeHistory] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 15 });
  const [currentPrice, setCurrentPrice] = useState(10000);
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
  const [lastKnownRange, setLastKnownRange] = useState({ start: 0, end: 15 });
  const [liquidationPrice, setLiquidationPrice] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLiquidated, setIsLiquidated] = useState(false);
  const [liquidationDetails, setLiquidationDetails] = useState(null);
  const [showLiquidationAnimation, setShowLiquidationAnimation] = useState(false);
  const [showProfitAnimation, setShowProfitAnimation] = useState(false); // State for profit animation
  const [showLossAnimation, setShowLossAnimation] = useState(false); // State for loss animation
  
  const candleStickSeries = useRef(null);
  const volumeSeries = useRef(null);
  const entryLine = useRef(null);
  const chartRef = useRef(null);

  // Define vibrant colors for the chart
  const chartColors = {
    background: '#000000',
    grid: '#1a1a1a',
    text: '#00ff00',
    upCandle: '#00ff00',
    downCandle: '#ff3333',
    volume: {
      up: 'rgba(0, 255, 0, 0.3)',
      down: 'rgba(255, 51, 51, 0.3)'
    }
  };
  
  // Initialize chart data
  useEffect(() => {
    const initializeGame = () => {
      const initialData = generateInitialData();
      setChartData(initialData);
      // Set initial current price
      if (initialData.length > 0) {
        setCurrentPrice(initialData[initialData.length - 1].close);
      }
    };

    if (chartData.length === 0) {
      initializeGame();
    }
    
    // Start the chart update interval
    const interval = setInterval(() => {
      updateChart();
      setTimeElapsed(prev => {
        const newTime = prev + 1;
        // Check if time is up (120 seconds)
        if (newTime >= 120) {
          setIsGameOver(true);
          clearInterval(interval);
        }
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [chartData.length === 0]); // Add dependency to re-run when chart data is cleared
  
  // Update PNL when position or chart data changes
  useEffect(() => {
    if (position && entryPrice && chartData.length > 0) {
      updatePnl();
    }
  }, [position, entryPrice, chartData]);

  // Generate initial chart data
  const generateInitialData = () => {
    const data = [];
    let price = 10000;
    let momentum = 0;
    let volatility = 0.02;
    let trendStrength = 0;
    
    // Generate 100 candles for historical data
    for (let i = 0; i < 100; i++) {
      // Update trend strength (0-1)
      trendStrength = Math.max(0, Math.min(1, trendStrength + (Math.random() - 0.5) * 0.1));
      
      // Update momentum (-1 to 1)
      momentum = momentum * 0.95 + (Math.random() - 0.5) * 0.1;
      
      // Dynamic volatility based on recent trend strength
      volatility = 0.015 + (trendStrength * 0.015);
      
      // 3% chance of a market crash or pump
      const isExtremeMove = Math.random() < 0.03;
      if (isExtremeMove) {
        volatility *= 4;
        momentum = (Math.random() < 0.7 ? -1 : 1) * Math.random(); // Strong directional bias
      }
      
      // Calculate price change with momentum influence
      const trendBias = momentum * volatility;
      const randomComponent = (Math.random() * 2 - 1) * volatility;
      const change = trendBias + randomComponent;
      
      const open = price;
      price = open * (1 + change);
      
      // Generate more natural wicks
      const bodySize = Math.abs(price - open);
      const wickMultiplier = 1 + (Math.random() * trendStrength);
      const upperWickSize = bodySize * wickMultiplier * (Math.random() * 0.8 + 0.2);
      const lowerWickSize = bodySize * wickMultiplier * (Math.random() * 0.8 + 0.2);
      
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
      
      // Update trend strength based on price movement
      if (Math.abs(change) > volatility * 1.5) {
        trendStrength = Math.min(1, trendStrength + 0.1);
      } else {
        trendStrength *= 0.95;
      }
    }
    
    return data;
  };
  
  // Helper function to calculate standard deviation
  const calculateStdDev = (values) => {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squareDiffs = values.map(value => Math.pow(value - mean, 2));
    const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / squareDiffs.length;
    return Math.sqrt(avgSquareDiff);
  };

  // Update chart with new data
  const updateChart = () => {
    setChartData(data => {
      if (data.length === 0) return generateInitialData();
      
      const lastCandle = data[data.length - 1];
      const open = lastCandle.close;
      
      // Get recent price movement
      const recentCandles = data.slice(-5);
      const priceChanges = recentCandles.map((c, i) => 
        i > 0 ? (c.close - recentCandles[i-1].close) / recentCandles[i-1].close : 0
      );
      
      // Calculate momentum from recent moves
      const momentum = priceChanges.reduce((sum, change) => sum + change, 0) / priceChanges.length;
      
      // Dynamic volatility based on recent price action
      const baseVolatility = 0.015;
      const recentVolatility = calculateStdDev(priceChanges) || baseVolatility;
      let volatility = (baseVolatility + recentVolatility) / 2;
      
      // 3% chance of extreme move
      const isExtremeMove = Math.random() < 0.03;
      if (isExtremeMove) {
        volatility *= 4;
        // Bias towards continuing recent trend during extreme moves
        if (momentum !== 0) {
          volatility *= Math.sign(momentum);
        }
      }
      
      // Calculate price change with momentum influence
      const trendBias = momentum * volatility * 2;
      const randomComponent = (Math.random() * 2 - 1) * volatility;
      const change = trendBias + randomComponent;
      
      const close = open * (1 + change);
      
      // Generate natural wicks based on volatility and momentum
      const bodySize = Math.abs(close - open);
      const wickMultiplier = 1 + (Math.abs(momentum) * 2);
      const upperWickSize = bodySize * wickMultiplier * (Math.random() * 0.8 + 0.2);
      const lowerWickSize = bodySize * wickMultiplier * (Math.random() * 0.8 + 0.2);
      
      const high = Math.max(open, close) + upperWickSize;
      const low = Math.min(open, close) - lowerWickSize;
      
      const newCandle = {
        time: Date.now(),
        open,
        high,
        low,
        close,
        volume: Math.floor(Math.random() * 1000) * (1 + Math.abs(momentum) * 2)
      };
      
      // Update current price
      setCurrentPrice(close);
      
      // Keep up to 100 candles in history
      const updatedData = [...data.slice(-99), newCandle];
      
      // Update visible range based on following state
      if (followingLatest) {
        setVisibleRange({
          start: Math.max(0, updatedData.length - 15),
          end: updatedData.length
        });
      } else {
        // When not following latest, maintain the same candles in view
        const distanceFromEnd = data.length - visibleRange.end;
        setVisibleRange({
          start: Math.max(0, updatedData.length - distanceFromEnd - 15),
          end: updatedData.length - distanceFromEnd
        });
      }
      
      return updatedData;
    });
  };
  
  // Calculate liquidation price when position is opened
  const calculateLiquidationPrice = (type, entry, size, leverageUsed) => {
    // The entire position size (wallet balance) is the margin
    // Liquidation occurs when losses equal the full wallet balance
    if (type === 'buy') {
      return entry * (1 - (1 / leverageUsed));
    } else {
      return entry * (1 + (1 / leverageUsed));
    }
  };

  // Update PNL calculation and trader state
  const updatePnl = () => {
    if (!position || !entryPrice) return;
    
    const latestPrice = chartData[chartData.length - 1]?.close || currentPrice;
    const priceDiff = (latestPrice - entryPrice) / entryPrice;
    
    // Get initial wallet balance (the position size at entry)
    const initialWalletBalance = walletBalance - pnl; // Remove current PNL to get initial balance
    
    let newPnl;
    if (position === 'buy') {
      newPnl = initialWalletBalance * priceDiff * leverage;
    } else {
      newPnl = initialWalletBalance * -priceDiff * leverage;
    }
    
    setPnl(newPnl);

    // Update wallet balance in real-time based on current PNL
    setWalletBalance(initialWalletBalance + newPnl);

    // Check for liquidation - entire wallet balance is the margin
    // Only liquidate when PnL is negative and losses exceed the initial wallet balance
    console.log("PnL Check:", {
      newPnl,
      initialWalletBalance,
      position,
      leverage,
      priceDiff: (latestPrice - entryPrice) / entryPrice,
      oldCondition: Math.abs(newPnl) >= initialWalletBalance,
      newCondition: newPnl <= -initialWalletBalance
    });
    
    if (newPnl <= -initialWalletBalance) {
      console.log("LIQUIDATION TRIGGERED - Negative PnL exceeds initial balance");
      handleLiquidation();
      return;
    }
    
    // Calculate PNL percentage relative to total position value
    const pnlPercentage = (newPnl / (initialWalletBalance * leverage)) * 100;
    
    // Update heart rate based on PNL and leverage
    const baseHeartRate = 75;
    const pnlEffect = Math.abs(pnlPercentage) * 0.5;
    const leverageEffect = (leverage / 100) * 30;
    const positionEffect = position ? 15 : 0;
    
    let newHeartRate = Math.round(baseHeartRate + pnlEffect + leverageEffect + positionEffect);
    
    // Add random fluctuations
    newHeartRate += Math.round(Math.random() * 5 - 2);
    
    // Ensure heart rate stays within realistic bounds
    newHeartRate = Math.min(200, Math.max(60, newHeartRate));
    setHeartRate(newHeartRate);
    
    // Update emotions based on multiple factors
    let newEmotion = 'neutral';
    
    // Get initial wallet balance (balance at position entry)
    const initialBalance = walletBalance - newPnl;
    
    if (newPnl < -initialBalance * 0.3) {
      newEmotion = 'panicked';
      // Rapidly decrease sanity during heavy losses
      setSanity(s => Math.round(Math.max(0, s - 0.2) * 10) / 10);
    } else if (newPnl < -initialBalance * 0.1) {
      newEmotion = 'stressed';
      // Slowly decrease sanity during moderate losses
      setSanity(s => Math.round(Math.max(0, s - 0.1) * 10) / 10);
    } else if (newPnl > initialBalance * 0.2) {
      newEmotion = 'euphoric';
      // Small sanity boost during big wins
      setSanity(s => Math.round(Math.min(8, s + 0.05) * 10) / 10);
    } else if (newPnl > initialBalance * 0.1) {
      newEmotion = 'happy';
    }
    
    // Additional emotional triggers
    if (leverage > 50 && Math.abs(pnlPercentage) > 5) {
      newEmotion = 'insane';
      setSanity(s => Math.round(Math.max(0, s - 0.15) * 10) / 10);
    }
    
    setEmotion(newEmotion);
  };
  
  // Handle liquidation
  const handleLiquidation = () => {
    // When liquidated, lose the entire wallet balance as it's the full margin
    const initialBalance = walletBalance - pnl; // Get the balance at position entry
    const marginLoss = -initialBalance; // Full balance loss
    
    // Store liquidation details
    setLiquidationDetails({
      type: position,
      entryPrice: entryPrice,
      liquidationPrice: currentPrice,
      leverage: leverage
    });
    
    // Add to trade history with liquidation flag
    setTradeHistory(prev => [
      ...prev,
      {
        type: position,
        entry: entryPrice,
        exit: currentPrice,
        pnl: marginLoss,
        timestamp: Date.now(),
        liquidated: true
      }
    ]);
    
    // Update total PNL and set wallet balance to zero
    setTotalPnl(prev => prev + marginLoss);
    setWalletBalance(0); // Completely liquidated
    
    // Reset position
    setPosition(null);
    setEntryPrice(null);
    setPnl(0);
    setLiquidationPrice(null);
    
    // Emotional response to liquidation
    setEmotion('panicked');
    setSanity(s => Math.round(Math.max(0, s - 1.5) * 10) / 10);
    setHeartRate(prev => Math.min(200, prev + 40));
    
    // Play liquidation animation
    setShowLiquidationAnimation(true);
    
    // Set liquidation flag
    setIsLiquidated(true);
    
    // End the game after animation completes
    setTimeout(() => {
      setIsGameOver(true);
      setShowLiquidationAnimation(false);
    }, 2000); // Animation duration
  };
  
  // Handle close with enhanced trader responses
  const handleClose = () => {
    if (!position || !entryPrice) return;
    
    const latestPrice = currentPrice;
    const finalPnl = pnl;

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
    
    // Update total PNL only (wallet balance is already updated in real-time)
    setTotalPnl(prev => prev + finalPnl);
    
    // Reset position
    setPosition(null);
    setEntryPrice(null);
    setPnl(0);
    
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
  
  // Format time for tooltips
  const formatCandleTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(timestamp);
  };
  
  // Calculate chart scaling for visible range
  const getChartScaling = () => {
    if (chartData.length === 0) return { min: 9000, max: 11000 };
    
    const visibleData = chartData.slice(visibleRange.start, visibleRange.end);
    
    let min = Infinity, max = -Infinity;
    visibleData.forEach(candle => {
      min = Math.min(min, candle.low);
      max = Math.max(max, candle.high);
    });
    
    // Increase padding for better visualization
    const padding = (max - min) * 0.3;
    
    // Ensure min and max are different enough for good scaling
    if (max - min < 100) {
      const midPoint = (max + min) / 2;
      min = midPoint - 50;
      max = midPoint + 50;
    }
    
    // If we have a position, ensure entry price is visible
    if (position && entryPrice) {
      min = Math.min(min, entryPrice * 0.98);
      max = Math.max(max, entryPrice * 1.02);
    }
    
    return { min: min - padding, max: max + padding };
  };
  
  // Get price position on chart (0-100%)
  const getPricePosition = (price) => {
    const { min, max } = getChartScaling();
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
    
    // Use the entire wallet balance as the position size
    const currentPositionSize = walletBalance;
    
    setPosition('buy');
    setEntryPrice(latestPrice);
    setPnl(0);
    
    // Calculate and set liquidation price
    const liqPrice = calculateLiquidationPrice('buy', latestPrice, currentPositionSize, leverage);
    setLiquidationPrice(liqPrice);
    
    // Immediate emotional response to taking a position
    setHeartRate(prev => Math.min(200, prev + 15));
    setSanity(s => Math.round(Math.max(0, s - (leverage > 50 ? 0.5 : 0.2)) * 10) / 10);
    
    // Brief emotional response
    setEmotion('excited');
    setTimeout(() => updatePnl(), 1000);
  };
  
  // Handle sell with enhanced trader responses
  const handleSell = () => {
    if (position === 'sell') return;
    
    const latestPrice = currentPrice;
    
    // Close existing position if any
    if (position) {
      handleClose();
    }
    
    // Use the entire wallet balance as the position size
    const currentPositionSize = walletBalance;
    
    setPosition('sell');
    setEntryPrice(latestPrice);
    setPnl(0);
    
    // Calculate and set liquidation price
    const liqPrice = calculateLiquidationPrice('sell', latestPrice, currentPositionSize, leverage);
    setLiquidationPrice(liqPrice);
    
    // Immediate emotional response to taking a position
    setHeartRate(prev => Math.min(200, prev + 15));
    setSanity(s => Math.round(Math.max(0, s - (leverage > 50 ? 0.5 : 0.2)) * 10) / 10);
    
    // Brief emotional response
    setEmotion('excited');
    setTimeout(() => updatePnl(), 1000);
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
      if (!isAtLatest) {
        setLastKnownRange({ start: newStart, end: newEnd });
      }
      
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
      setLastKnownRange({ start: newStart, end: newEnd });
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
  
  // Add reset game function
  const resetGame = () => {
    // Reset all game states
    setIsGameOver(false);
    setTimeElapsed(0);
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
    setVisibleRange({ start: 0, end: 15 });
    setChartZoom(1);
    setChartOffset(0);
    setFollowingLatest(true);
    
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
        selectedCharacter={selectedCharacter}
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