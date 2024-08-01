import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextProps {
  modalMessage: string;
  modalAction: () => void;
  setModalMessage: (message: string) => void;
  setModalAction: (action: () => void) => void;
  type: string;
  setType : (message: string) => void;

}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalAction, setModalAction] = useState<(() => void) | undefined>(undefined);
  const [type, setType] = useState<string>("")


  return (
    <ModalContext.Provider value={{modalMessage , setModalMessage, modalAction, setModalAction, type, setType }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
