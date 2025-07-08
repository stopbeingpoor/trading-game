import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { AuthContext } from './context';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [profile, setProfile] = useState(null);

  const getProfile = useCallback(async () => {
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    }
  }, [user]);

  const updateWalletBalance = async (newBalance) => {
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({ wallet_balance: newBalance })
        .eq('id', user.id);
      if (error) {
        console.error('Error updating wallet balance:', error);
      } else {
        setProfile(prevProfile => ({ ...prevProfile, wallet_balance: newBalance }));
      }
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session, getProfile]);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setIsGuest(false);
    setProfile(null);
  };

  const signInAsGuest = () => {
    setIsGuest(true);
  };

  const value = {
    user,
    session,
    isGuest,
    profile,
    signInWithGoogle,
    signOut,
    signInAsGuest,
    updateWalletBalance,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;