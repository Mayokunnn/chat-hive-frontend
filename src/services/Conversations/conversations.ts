// src/api/conversations.ts
import axiosInstance from '../api';
import { Conversation, ConversationData, ConversationsData} from '../../utils/types'

export const fetchConversations = async (): Promise<ConversationsData> => {
  const id = localStorage.getItem('userId');
  const { data } = await axiosInstance.get(`/users/${id}/conversations`);
  return data.data; // Adjust based on your response structure
};

export const fetchAllConversations = async (): Promise<ConversationsData> => {
  const { data } = await axiosInstance.get(`/conversations`);
  return data.data; // Adjust based on your response structure
};

export const fetchSingleConversation = async (conversationId: number): Promise<ConversationData> => {
  const { data } = await axiosInstance.get<ConversationData>(`/conversations/${conversationId}`);
  return data;
};

export const createConversation = async (conversation: Partial<Conversation>)=> {
  const { data } = await axiosInstance.post('/conversations/create', conversation);
  return data.data;
};

export const updateConversation = async (conversationId: number, conversation: Partial<Conversation>)=> {
  const { data } = await axiosInstance.post(`/conversations/${conversationId}/update`, conversation);
  return data.data;
};

export const deleteConversation = async (conversationId: number) => {
  await axiosInstance.post(`/conversations/${conversationId}/delete`);
};

