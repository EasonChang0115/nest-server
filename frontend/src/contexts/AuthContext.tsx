import React, { createContext, useContext, useState, useMemo } from 'react';
import type { User } from '../types/auth';

interface AuthContextProps {
  currentUser: User;
  isLogin: boolean;
  updateUserProfile: (user: User) => void;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState<User>({
    name: '',
  });

  const isLogin = useMemo(() => !!currentUser.name, [currentUser]);

  const login = (name: string) => {
    setCurrentUser({ name });
  };

  function logout() {
    setCurrentUser({ name: '' });
  }

  function updateUserProfile(user: User) {
    setCurrentUser(user);
  }

  const value = {
    currentUser,
    isLogin,
    login,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
