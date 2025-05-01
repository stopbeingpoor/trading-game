import React from 'react';
import PropTypes from 'prop-types';
import FullscreenButton from './FullscreenButton';

// Simple container component that uses CSS for layout
const GameViewportScaler = ({ children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black overflow-hidden p-2 sm:p-4">
      {/* Outer container handles centering and responsive padding */}
      {/* Game container takes available space */}
      <div
        className="relative w-full h-full max-w-full max-h-full overflow-hidden bg-black"
        // Removed inline style with fixed margin
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