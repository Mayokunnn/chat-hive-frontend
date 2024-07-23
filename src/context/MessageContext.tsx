import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { MessageItem } from "../utils/types";

interface MessageContextType {
  messages: MessageItem[];
  setMessages: Dispatch<SetStateAction<MessageItem[]>>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<MessageItem[]>([
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
      createdAt: "2024-07-20T14:08:00Z",
    },
    {
      content: null,
      senderId: 2,
      conversationId: 101,
      id: 10,
      messageType: "image",
      url: "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      createdAt: "2024-07-20T14:09:00Z",
    },
    {
      content: "I have a meeting at 3 PM.",
      senderId: 1,
      conversationId: 101,
      id: 11,
      messageType: "text",
      url: null,
      createdAt: "2024-07-20T14:04:00Z",
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
  ]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
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
