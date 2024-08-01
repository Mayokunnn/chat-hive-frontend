import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MessageItem } from '../utils/types';

interface ReplyMessageContextType {
  replyMessage: MessageItem | null;
  setReplyMessage: (message: MessageItem | null) => void;
}

const ReplyMessageContext = createContext<ReplyMessageContextType | undefined>(undefined);

export const ReplyMessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [replyMessage, setReplyMessage] = useState<MessageItem | null>(null);

  return (
    <ReplyMessageContext.Provider value={{ replyMessage, setReplyMessage }}>
      {children}
    </ReplyMessageContext.Provider>
  );
};

export const useReplyMessage = () => {
  const context = useContext(ReplyMessageContext);
  if (!context) {
    throw new Error('useReplyMessage must be used within a ReplyMessageProvider');
  }
  return context;
};
