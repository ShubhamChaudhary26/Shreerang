'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface UserContextType {
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const session = Cookies.get('session');
    if (session) {
      try {
        const sessionData = JSON.parse(session);
        setUserEmail(sessionData.email || null);
      } catch (error) {
        console.error('Error parsing session cookie:', error);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};