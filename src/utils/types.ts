
export interface UserResource {
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

export interface Error {
  message: string;
  data: {
    [key: string]: [string]
  };
  status: string;
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
      token: string;
      token_type: string;
      otpExpiration: string;
      user: {
        id: string;
        email: string;
      }
      expires_in: number; // Expiry time in seconds-
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

export interface UsersData {
  message: string;
  data: UserResource[];
  status: string;
}

export interface Conversation {
  id: number;
  type: string;
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

export interface CreateConversationData{
  user_ids: (string | number | null)[];
  name: string;
  image: File;
  chat_wallpaper: File
}

export interface Group {
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
  type: string;
  content: string
}