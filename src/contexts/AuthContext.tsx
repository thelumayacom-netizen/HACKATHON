import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { authService } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        // Use authService instead of direct supabase call
        const { session, error } = await authService.getCurrentSession();
        if (error) {
          console.error('Error getting session:', error);
        } else {
          console.log('Initial session:', session);
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    setLoading(true);
    try {
      const result = await authService.signUp(email, password, fullName);
      
      // If sign up is successful and returns a session, update state immediately
      if (result.data?.session) {
        console.log('Sign up successful, updating state:', result.data.session);
        setSession(result.data.session);
        setUser(result.data.session.user);
      }
      
      return result;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await authService.signIn(email, password);
      
      // If sign in is successful, update state immediately
      if (result.data?.session) {
        console.log('Sign in successful, updating state:', result.data.session);
        setSession(result.data.session);
        setUser(result.data.session.user);
      }
      
      return result;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const result = await authService.signOut();
      
      // Always clear state regardless of the result
      // This handles cases where the session is already expired/missing
      console.log('Clearing auth state after signout attempt');
      setSession(null);
      setUser(null);
      
      // If there was an error but it wasn't a session missing error, 
      // we should still return the error for logging purposes
      if (result.error) {
        console.warn('Sign out completed with warning:', result.error.message);
      } else {
        console.log('Sign out successful');
      }
      
      // Always return success since we cleared the local state
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      
      // Even if there's an error, clear the local state
      console.log('Clearing auth state due to signout error');
      setSession(null);
      setUser(null);
      
      // Return the error for logging but don't prevent UI from updating
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};