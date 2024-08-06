/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message } from '../utils/types';
import { useFetchMessages } from '../services/Messages/useFetchMessages';
import { useConversation } from './ConversationContext';


interface MessageContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
 updateMessage: (id:string, newContent: string) => void;
  setMessages: (messages: Message[]) => void;
  removeMessage: (id: string) => void;
  markMessageAsRead: (id: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello, how are you?",
      senderId: 1,
      conversationId: 101,
      id: 1,
      messageType: "text",
      url: null,
      createdAt: "2024-07-20T14:00:00Z",
    },
    {
      content: "I am good, thanks! How about you?",
      senderId: 2,
      conversationId: 101,
      id: 2,
      messageType: "text",
      url: null,
      createdAt: "2024-07-20T14:01:00Z",
    },
    {
      content: "I am doing well, thank you.",
      senderId: 2,
      conversationId: 101,
      id: 3,
      messageType: "text",
      url: null,
      createdAt: "2024-07-20T14:02:00Z",
    },
    {
      content: "What are your plans for today?",
      senderId: 2,
      conversationId: 101,
      id: 4,
      messageType: "text",
      url: null,
      createdAt: "2024-07-20T14:03:00Z",
    },
    {
      content: "I have a meeting at 3 PM.",
      senderId: 1,
      conversationId: 101,
      id: 5,
      messageType: "text",
      url: null,
      createdAt: "2024-07-20T14:04:00Z",
    },
    {
      content: "Good luck with that!",
      senderId: 1,
      conversationId: 101,
      id: 6,
      messageType: "text",
      url: null,
      createdAt: "2024-07-20T14:05:00Z",
      reply: {
        content: "What are your plans for today?",
        senderId: 2,
        conversationId: 101,
        id: 4,
        messageType: "text",
        url: null,
        createdAt: "2024-07-20T14:03:00Z",
      },
    },
    {
      content: "Thanks!",
      senderId: 1,
      conversationId: 101,
      id: 7,
      messageType: "text",
      url: null,
      createdAt: "2024-07-20T14:06:00Z",
    },
    {
      content: "Can you review this document for me?",
      senderId: 2,
      conversationId: 101,
      id: 8,
      messageType: "text",
      url: null,
      createdAt: "2024-07-20T14:07:00Z",
    },
    {
      content: "Sure, send it over.",
      senderId: 1,
      conversationId: 101,
      id: 9,
      messageType: "text",
      url: null,
      createdAt: "2024-07-22T14:08:00Z",
    },
    {
      content: null,
      senderId: 2,
      conversationId: 101,
      id: 10,
      messageType: "image",
      url: "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      createdAt: "2024-07-22T14:09:00Z",
    },
    {
      content: "I have a meeting at 3 PM.",
      senderId: 1,
      conversationId: 101,
      id: 11,
      messageType: "text",
      url: null,
      createdAt: "2024-07-22T14:04:00Z",
      reply: {
        content: null,
        senderId: 2,
        conversationId: 101,
        id: 10,
        messageType: "image",
        url: "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        createdAt: "2024-07-20T14:09:00Z",
      },
    },
  ],);
  const { conversation } = useConversation();
  const {deleteMessageMutation, editMessageMutation, updateMessageStatusMutation} = useFetchMessages(conversation?.id)
  const {mutate: deleteMessage} = deleteMessageMutation
  const {mutate: editMessage} = editMessageMutation
  const {mutate: markAsRead} = updateMessageStatusMutation


  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const updateMessage = (id: string, newContent: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, content: newContent } : message
      )
    );
    console.log(id, newContent)
    editMessage({messageId: id, message: newContent});  // Adjust this as needed based on your API
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
    markAsRead(id, true)
  };
  
  

  const removeMessage = (id: string) => {
    setMessages((prevMessages) => prevMessages.filter((message) => message.id != id));
    deleteMessage(id);
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, setMessages, removeMessage, updateMessage, markMessageAsRead }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
