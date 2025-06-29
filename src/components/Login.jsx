import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInWithEmail, signUpNewUser, signInWithGoogle } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
    } catch (error) {
      console.error('Failed to log in', error);
      // TODO: Add user-facing error message
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpNewUser(email, password);
    } catch (error) {
      console.error('Failed to sign up', error);
      // TODO: Add user-facing error message
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Failed to sign in with Google', error);
      // TODO: Add user-facing error message
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 font-press-start">
      <div className="bg-black border-2 border-green-500 p-8 rounded-lg shadow-lg text-white max-w-sm w-full">
        <h2 className="text-2xl text-center text-green-500 mb-6">Get Started</h2>
        <form>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-400 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 bg-gray-800 border-2 border-green-500 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-green-300"
                placeholder="trader@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-green-400 mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-3 bg-gray-800 border-2 border-green-500 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-green-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-4 pt-4">
              <button
                onClick={handleLogin}
                className="w-full bg-green-500 text-black py-3 rounded-md hover:bg-green-600 transition-colors duration-300"
              >
                Login
              </button>
              <button
                onClick={handleSignUp}
                className="w-full bg-blue-500 text-black py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Sign Up
              </button>
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-black py-3 rounded-md hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google icon" className="w-6 h-6 mr-2" />
                Sign In with Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;