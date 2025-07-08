import React from 'react';
import { useAuth } from '../hooks/useAuth'; // Import useAuth hook

// Define the props the component will accept
const GameHeader = ({
  profile,
  walletBalance,
  totalPnl,
  formatPnl, // Function passed from parent
}) => {
  const { user, signOut } = useAuth(); // Get user and signOut function

  return (
    <header className="pixel-container p-0.5 sm:p-2 mb-0.5 sm:mb-2"> {/* Reduced base padding/margin */}
      <div className="flex justify-between items-center">
        <h1 className="pixel-header text-center text-lg sm:text-2xl">
          {profile && profile.username ? profile.username : 'STOP BEING POOR'}
        </h1> {/* Responsive text */}
        {user && (
          <button
            onClick={signOut}
            className="pixel-button bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded text-xs sm:text-base"
          >
            Logout
          </button>
        )}
      </div>
      {/* Stacks vertically on mobile, row on small+, aligns center on mobile */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-1 sm:gap-4"> {/* Reduced base gap */}
        {/* Left Column: Trader Info + Sanity (Trader Box Removed) */}
        <div className="flex flex-col gap-0.5 sm:gap-2 w-full sm:w-auto"> {/* Reduced base gap, width */}
          
        </div>

        {/* Right Column: Stats - Aligns center on mobile, end on small+ */}
        <div className="flex flex-row items-center justify-between md:flex-col md:items-end w-full sm:w-auto"> {/* Horizontal mobile, vertical md+, space-between mobile */}
          {/* Horizontal group for Wallet and PNL - Stacks on very small screens if needed (optional, using gap for now) */}
          <div className="flex flex-row items-baseline gap-2"> {/* Horizontal layout, baseline align */}
            {/* Wallet Balance Block */}
            <div className="flex flex-col items-center sm:items-end"> {/* Adjusted alignment */}
              <div className="text-xs sm:text-sm opacity-70">WALLET BALANCE</div> {/* Responsive text */}
              {/* Use formatPnl prop */}
              <div className="text-base sm:text-lg">{formatPnl(walletBalance)}</div> {/* Responsive text */}
            </div>
            {/* Total PNL Block */}
            <div className="flex flex-col items-center sm:items-end"> {/* Adjusted alignment */}
              <div className="text-xs sm:text-sm opacity-70">TOTAL PNL</div> {/* Responsive text */}
              {/* Use formatPnl prop */}
              <div className={`text-base sm:text-lg ${totalPnl >= 0 ? 'text-[#00ff00]' : 'text-[#ff3333]'}`}> {/* Responsive text */}
                {formatPnl(totalPnl)}
              </div>
            </div>
            </div> {/* Closes Wallet/PNL group */}

            {/* Sanity Container was moved */}
          </div> {/* Closes Right Column */}
      </div>
    </header>
  );
};

export default GameHeader;