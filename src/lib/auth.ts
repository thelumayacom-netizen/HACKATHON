import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  profile?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string, fullName?: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || '',
          },
        },
      });
      
      if (error) {
        console.error('Sign up error:', error);
      }
      
      return { data, error };
    } catch (error) {
      console.error('Sign up exception:', error);
      return { data: null, error };
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
      } else if (data.session) {
        console.log('Sign in successful, session created:', data.session.user.email);
      }
      
      return { data, error };
    } catch (error) {
      console.error('Sign in exception:', error);
      return { data: null, error };
    }
  },

  // Sign out with improved error handling
  async signOut() {
    try {
      // First check if we have a session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // No active session, consider it a successful signout
        console.log('No active session found, treating as successful signout');
        return { error: null };
      }

      const { error } = await supabase.auth.signOut();
      
      if (error) {
        // Check if it's a session missing error
        if (error.message.includes('Auth session missing')) {
          console.log('Session already missing, treating as successful signout');
          return { error: null };
        }
        console.error('Sign out error:', error);
      }
      
      return { error };
    } catch (error: any) {
      console.error('Sign out exception:', error);
      
      // If it's a session missing error, treat as successful
      if (error.message && error.message.includes('Auth session missing')) {
        console.log('Session missing exception, treating as successful signout');
        return { error: null };
      }
      
      return { error };
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Get current user error:', error);
      }
      
      return { user, error };
    } catch (error) {
      console.error('Get current user exception:', error);
      return { user: null, error };
    }
  },

  // Get current session
  async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Get current session error:', error);
      }
      
      return { session, error };
    } catch (error) {
      console.error('Get current session exception:', error);
      return { session: null, error };
    }
  },

  // Get user profile
  async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Get user profile error:', error);
      }
      
      return { data, error };
    } catch (error) {
      console.error('Get user profile exception:', error);
      return { data: null, error };
    }
  },

  // Update user profile
  async updateProfile(userId: string, updates: { full_name?: string; avatar_url?: string }) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single();
        
      if (error) {
        console.error('Update profile error:', error);
      }
      
      return { data, error };
    } catch (error) {
      console.error('Update profile exception:', error);
      return { data: null, error };
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },

  // Refresh session
  async refreshSession() {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        console.error('Refresh session error:', error);
      }
      
      return { data, error };
    } catch (error) {
      console.error('Refresh session exception:', error);
      return { data: null, error };
    }
  },

  // Force clear local session (useful for cleanup)
  async clearSession() {
    try {
      // This will clear the local session without making a server request
      await supabase.auth.signOut({ scope: 'local' });
      return { error: null };
    } catch (error) {
      console.error('Clear session exception:', error);
      return { error };
    }
  },
};