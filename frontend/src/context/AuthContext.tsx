import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: Credentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('session', {
      email,
      password,
    });

    console.log(response.data);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'Cristiano', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
