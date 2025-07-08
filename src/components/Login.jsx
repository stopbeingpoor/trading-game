import React from 'react';
import { useAuth } from '../hooks/useAuth';
import SBP_BG from '../assets/background/SBP.gif';

const Login = () => {
  const { signInWithGoogle, signInAsGuest } = useAuth();

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    await signInWithGoogle();
  };

  const handleGuestLogin = () => {
    signInAsGuest();
  };

  return (
    <div
      className="fixed inset-0 z-50 font-press-start flex flex-col items-center justify-center text-center"
      style={{
        backgroundImage: `url(${SBP_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 flex flex-col items-center">
        <h1
          className="text-5xl text-green-400 mb-8 px-4"
          style={{ textShadow: '4px 4px 2px rgba(0,0,0,0.8)' }}
        >
          Welcome to Stop Being Poor: The Trading Game
        </h1>
        <div className="bg-black border-2 border-green-500 p-8 rounded-lg shadow-lg text-white max-w-sm w-full">
          <h2 className="text-2xl text-center text-green-500 mb-6">Get Started</h2>
          <div className="flex flex-col space-y-4 pt-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white text-black py-3 rounded-md hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google icon" className="w-6 h-6 mr-2" />
              Sign In with Google
            </button>
            <button
              onClick={handleGuestLogin}
              className="w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-600 transition-all duration-300 flex flex-col items-center justify-center"
            >
              <span>Play as Guest</span>
              <span className="text-xs text-gray-400 normal-case font-normal">Your progress will not be saved.</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;