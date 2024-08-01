import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Conversation } from '../utils/types';

interface ConversationContextType {
  conversation: Conversation | null;
  setConversation: (message: Conversation | null) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [conversation, setConversation] = useState<Conversation | null>(null);

  return (
    <ConversationContext.Provider value={{ conversation, setConversation }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
};
