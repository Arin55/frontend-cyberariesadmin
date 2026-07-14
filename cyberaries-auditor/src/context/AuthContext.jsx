import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage on mount
    const storedUser = localStorage.getItem('cyberaries_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('cyberaries_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    // Simulate API delay for future-proofing
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const targetEmail = 'rahul.sharma@cyberaries.com';
        const targetPassword = 'Auditor@123';

        if (email.trim().toLowerCase() === targetEmail && password === targetPassword) {
          const userData = {
            email: targetEmail,
            name: 'Rahul Sharma',
            role: 'AUDITOR - CYBERARIES'
          };
          localStorage.setItem('cyberaries_user', JSON.stringify(userData));
          setUser(userData);
          setIsLoading(false);
          resolve({ success: true });
        } else {
          setIsLoading(false);
          reject(new Error('Invalid email or password. Please try again.'));
        }
      }, 500); // 500ms artificial delay
    });
  };

  const logout = () => {
    localStorage.removeItem('cyberaries_user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
