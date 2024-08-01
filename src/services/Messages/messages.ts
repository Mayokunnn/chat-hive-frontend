// src/api/messages.ts
import axiosInstance from '../api';
import { Message, MessageData } from '../../utils/types';

export const fetchMessages = async (conversationId: string): Promise<MessageData> => {
  const { data } = await axiosInstance.get<MessageData>(`/conversations/${conversationId}/messages`);
  return data;
};

export const sendMessage = async (conversationId: string, message: Partial<Message>) => {
  const { data } = await axiosInstance.post(`/conversations/${conversationId}/messages/send`, message);
  return data.data;
};

export const forwardMessage = async (messageId: string, conversationId: string) => {
  const { data } = await axiosInstance.post(`/conversations/${conversationId}/messages/${messageId}/forward`, { conversationId });
  return data.data;
};

export const updateMessageStatus = async (messageId: string, status: string, conversationId: string) => {
  const { data } = await axiosInstance.post(`/conversations/${conversationId}/messages/${messageId}/update-status`, { status });
  return data.data;
};

export const editMessage = async (messageId: string, message: Partial<Message>,  conversationId: string) => {
  const { data } = await axiosInstance.post(`/conversations/${conversationId}/messages/${messageId}/edit`, message);
  return data.data;
};

export const deleteMessage = async (messageId: string, conversationId: string) => {
  await axiosInstance.post(`/conversations/${conversationId}/messages/${messageId}/delete`);
};
