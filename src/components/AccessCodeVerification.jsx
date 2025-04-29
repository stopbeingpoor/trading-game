import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Import the Supabase client

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Enter Access Code</h2>
        <div className="mb-4">
          <label htmlFor="accessCode" className="block text-sm font-medium text-gray-400 mb-1">
            Access Code
          </label>
          <input
            type="text"
            id="accessCode"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Enter your code"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
            disabled={isLoading}
          />
        </div>
        <button
          onClick={handleVerify}
          className={`w-full py-2 px-4 rounded-md font-semibold transition-colors ${
            isLoading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </button>
        {message && (
          <p className={`mt-4 text-center text-sm ${message.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AccessCodeVerification;