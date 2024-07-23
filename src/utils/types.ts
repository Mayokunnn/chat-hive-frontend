
export interface MessageItem {
    id: number;
    content?: string | null;
    senderId: number;
    conversationId: number;
    messageType: string;
    url?: string | null;
    reply?: MessageItem | null;
    createdAt: string; // ISO string format or Date object
  }
  
  export interface Messages {
    messages: MessageItem[];
  }

  export interface Message{
    message: MessageItem;
  }
  