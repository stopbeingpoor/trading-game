import React, { useState, useEffect, useCallback } from 'react';

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!!document.fullscreenElement);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari
    document.addEventListener('mozfullscreenchange', handleFullscreenChange); // Firefox
    document.addEventListener('MSFullscreenChange', handleFullscreenChange); // IE/Edge

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [handleFullscreenChange]);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        // Standard
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
        // Safari
        else if (document.documentElement.webkitRequestFullscreen) {
          await document.documentElement.webkitRequestFullscreen();
        }
        // Firefox
        else if (document.documentElement.mozRequestFullScreen) {
          await document.documentElement.mozRequestFullScreen();
        }
        // IE/Edge
        else if (document.documentElement.msRequestFullscreen) {
          await document.documentElement.msRequestFullscreen();
        }
      } catch (err) {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        // Optionally inform the user that fullscreen failed
      }
    } else {
      try {
        // Standard
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
        // Safari
        else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
        // Firefox
        else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen();
        }
        // IE/Edge
        else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      } catch (err) {
        console.error(`Error attempting to disable full-screen mode: ${err.message} (${err.name})`);
      }
    }
  };

  // Basic styling - consider positioning it better in the parent component
  const buttonStyle = {
    position: 'absolute',
    top: '10px', // Example position
    right: '10px', // Example position
    zIndex: 1000, // Ensure it's above other elements
  };

  return (
    <button
      onClick={toggleFullscreen}
      className="pixel-button p-1 text-xs" // Override padding and font size
      style={buttonStyle}
      title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    >
      {/* Simple icon representation */}
      {isFullscreen ? '[ ]' : '[=]'}
    </button>
  );
};

export default FullscreenButton;