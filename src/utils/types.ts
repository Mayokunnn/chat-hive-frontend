
export interface MessageItem {
    id?: number;
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
  

export interface UserResource {
  type: string;
  id: number;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  username: string;
  loggedIn: boolean;
  emailVerifiedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  links: {
    self: string;
  };
}

export interface LoginResponse {
  token: string;
  token_type: string;
  user: UserResource;
  expires_in: number; // Expiry time in seconds
}


export interface LoginData {
  username: string; // or email, depending on your authentication method
  password: string;
}