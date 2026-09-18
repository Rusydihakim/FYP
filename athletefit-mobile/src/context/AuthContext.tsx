import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { UserProfile, UserRole } from '../types/auth';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, role?: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  switchRoleDemo: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>({
    id: 'demo-user-1',
    email: 'athlete@athletefit.com',
    full_name: 'Alex Rivera',
    role: 'Athlete',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: session.user.user_metadata?.full_name || 'User',
          role: (session.user.user_metadata?.role as UserRole) || 'Athlete',
        });
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: session.user.user_metadata?.full_name || 'User',
          role: (session.user.user_metadata?.role as UserRole) || 'Athlete',
        });
      } else {
        // Default demo user for instant preview
        setUser({
          id: 'demo-user-1',
          email: 'athlete@athletefit.com',
          full_name: 'Alex Rivera',
          role: 'Athlete',
        });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, role: UserRole = 'Athlete') => {
    setIsLoading(true);
    setUser({
      id: 'demo-user-1',
      email,
      full_name: email.split('@')[0],
      role,
    });
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setIsLoading(false);
  };

  const switchRoleDemo = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, switchRoleDemo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
