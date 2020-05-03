import React, { createContext, useContext, useCallback } from 'react';
import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const toastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('addToast');
  }, []);

  const removeToast = useCallback(() => {
    console.log('removeToast');
  }, []);

  return (
    <toastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </toastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(toastContext);
  if (!context) {
    throw new Error('useToast must be used withing a ToastProvider');
  }
  return context;
}
