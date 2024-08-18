/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Message } from "../utils/types";
import { useFetchMessages } from "../services/Messages/useFetchMessages";
import { useConversation } from "./ConversationContext";

interface MessageContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  updateMessage: (id: string, newContent: string) => void;
  setMessages: (messages: Message[]) => void;
  removeMessage: (id: string) => void;
  markMessageAsRead: (id: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { conversation } = useConversation();
  const {
    deleteMessageMutation,
    editMessageMutation,
    updateMessageStatusMutation,
  } = useFetchMessages(conversation?.id + "");
  const { mutate: deleteMessage } = deleteMessageMutation;
  const { mutate: editMessage } = editMessageMutation;
  const { mutate: markAsRead } = updateMessageStatusMutation;

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const updateMessage = (id: string, newContent: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, content: newContent } : message
      )
    );
    console.log(id, newContent);
    editMessage({ messageId: id, message: newContent }); // Adjust this as needed based on your API
  };

  const markMessageAsRead = (id: string) => {
    // Update local state
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, read: true } : message
      )
    );

    // console.log(id);
    // Call the API to update the message status on the server
    markAsRead({ id, read: true });
  };

  const removeMessage = (id: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id != id)
    );
    deleteMessage(id);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        addMessage,
        setMessages,
        removeMessage,
        updateMessage,
        markMessageAsRead,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};
