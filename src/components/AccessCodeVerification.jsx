import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Import the Supabase client
import BackgroundGif from '../assets/background/SBP.gif'; // Import the background GIF

function AccessCodeVerification({ onVerificationSuccess }) { // Accept prop
  const [accessCode, setAccessCode] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Optional: for loading state

  const handleVerify = async () => {
    setMessage(''); // Clear previous message
    setIsLoading(true); // Set loading state

    try {
      const { data, error } = await supabase.functions.invoke('verify-access-code', {
        body: { access_code: accessCode }, // Match the key expected by the Edge Function
      });

      if (error) {
        // Handle Supabase Edge Function invocation errors (network, function internal errors)
        console.error('Supabase function invocation error:', error);
        setMessage(`Error: ${error.message || 'Failed to verify code.'}`);
      } else if (data.error) {
        // Handle errors returned explicitly by the Edge Function logic
        console.error('Edge function returned error:', data.error);
        setMessage(`Error: ${data.error}`);
      } else {
        // Handle success response from the Edge Function
        // Don't need to set a message here anymore, as the component will unmount
        // setMessage(data.message || 'Success! Access granted.');
        if (onVerificationSuccess) {
          onVerificationSuccess(); // Call the callback prop on success
        }
      }
    } catch (err) {
      // Catch any unexpected errors during the async operation
      console.error('Unexpected error during verification:', err);
      setMessage('Error: An unexpected error occurred.');
    }

    setIsLoading(false); // Reset loading state
    setAccessCode(''); // Clear input after attempt
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${BackgroundGif})` }}
    >
      {/* Overlay div for darkening */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Content */}
      <div className="relative z-10 pixel-container w-full max-w-sm">
        <h2 className="pixel-header text-center">Enter Access Code</h2>
        <div className="mb-4">
          <label htmlFor="accessCode" className="block mb-1 font-['VT323'] text-[var(--pixel-text)]">
            Access Code
          </label>
          <input
            type="text"
            id="accessCode"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Enter your code"
            className="w-full px-3 py-2 bg-[var(--pixel-bg-light)] border-2 border-[var(--pixel-border)] text-[var(--pixel-text)] placeholder:text-gray-500 focus:outline-none focus:border-[var(--pixel-accent)] font-['VT323']"
            disabled={isLoading}
          />
        </div>
        <button
          onClick={handleVerify}
          className="pixel-button w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </button>
        {message && (
          <p className={`mt-4 text-center text-sm font-['VT323'] ${message.startsWith('Error') ? 'text-[var(--pixel-secondary)]' : 'text-[var(--pixel-primary)]'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AccessCodeVerification;