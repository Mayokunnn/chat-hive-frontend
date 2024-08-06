
export interface UserResource {
  type: string;
  id: number;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  active: number;
  last_active: string | null;
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
  message: string;
  data: {
      token: string;
      token_type: string;
      user: UserResource;
      expires_in: number; // Expiry time in seconds
    };
  status: string;
}


export interface RegisterResponse {
  message: string;
  data: {
    [key: number]: {
      token: string;
      token_type: string;
      user: UserResource;
      expires_in: number; // Expiry time in seconds
    };
  };
  status: string;
}


export interface LoginData {
 email: string; 
password: string;
}

export interface RegisterData {
  email: string; 
  name: string,
  password: string;
}

export interface UserData {
  message: string;
  data: UserResource;
  status: string;
}

export interface Conversation {
  type: 'conversation';
  id: number;
  conversationType: string;
  name: string;
  image: string;
  emailVerifiedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  active: boolean;
  blocked: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadMessages?: number;
  includes?: {
      users: UserResource[];
  };
  links: {
      self: string;
  };
}

export interface Group {
  type: 'group';
  id: number;
  name: string;
  image: string;
  ownerId: number;
  conversationId: number;
  createdAt?: string;
  updatedAt?: string;
  includes?: {
      members: UserResource[];
      conversation: Conversation;
  };
}

export interface Message {
  type?:string;
  id?: string;
  messageType?: string;
  url?: string;
  content?: string;
  senderName?: string;
  senderImage?: string | null;
  senderId?: string;
  conversationId?: number;
  read?: boolean;
  emailVerifiedAt?: string | null;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  includes?: {
      conversation?: Conversation;
      sender?: UserResource;
  };
}


export interface ConversationData {
  message: string;
  data: Conversation;
  status: string;
}

export interface ConversationsData {
  message: string;
  data: Conversation[];
  status: string;
}

export interface MessageData {
  message: string;
  data: Message;
  status: string;
}

export interface MessagesData {
  message: string;
  data: Message[];
  status: string;
}

export interface GroupData {
  message: string;
  data: Group;
  status: string;
}

export interface editMessageData {
  messageId: string;
  senderId: string;
  conversationId:string
  type: string;
  content: string
}