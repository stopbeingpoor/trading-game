import React from 'react';
import PropTypes from 'prop-types';
import FullscreenButton from './FullscreenButton';

// Simple container component that uses CSS for layout
const GameViewportScaler = ({ children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black overflow-hidden">
      {/* Game container with fixed size and margin */}
      <div
        className="relative"
        style={{
          width: 'calc(100% - 30px)',   // 10px margin on left and right
          height: 'calc(100% - 30px)',  // 10px margin on top and bottom
          maxWidth: '100%',
          maxHeight: '100%',
          overflow: 'hidden',
          backgroundColor: 'black',
        }}
      >
        {/* Game content */}
        <div className="w-full h-full">
          {children}
        </div>
        
      </div>
      {/* Fullscreen button (Moved outside inner div) */}
      <FullscreenButton />
    </div>
  );
};

GameViewportScaler.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameViewportScaler;