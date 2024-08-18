// src/hooks/useConversation.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchConversations, 
  fetchSingleConversation, 
  createConversation, 
  fetchAllConversations,
  updateConversation, 
  deleteConversation, 
} from './conversations';
import { Conversation } from '../../utils/types';
import { fetchMessages } from '../Messages/messages';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const useConversations = () => {
  const queryClient = useQueryClient();
 // Fetch all conversations
 const conversations = useQuery({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
    enabled: true,
    staleTime: 0,
  });


  const allConversations = useQuery({
    queryKey: ['conversations'],
    queryFn: fetchAllConversations,
    enabled: true,
    staleTime: 5,
  });


  // Fetch single conversation
  const useSingleConversation = (conversationId: number) => {
    return useQuery({
      queryKey: ['conversation', conversationId],
      queryFn: () => fetchSingleConversation(conversationId),
    });
  };

  // Create conversation
  const createConversationMutation = useMutation({
    mutationFn: createConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['conversations'],
        refetchType: 'active',
      });
    },
    onError: (data: AxiosError) => {
      console.log(data);
      const errorData: Error = data.response?.data;
      toast.error(errorData.message);
  },
  });

  // Update conversation
  const updateConversationMutation = useMutation({
    mutationFn: ({ conversationId, conversation }: { conversationId: number; conversation: Partial<Conversation> }) =>
      updateConversation(conversationId, conversation),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ['conversations', 'conversation'],
            refetchType: 'active',
          });
    },
  });

  // Delete conversation
  const deleteConversationMutation = useMutation({
    mutationFn: (conversationId) => deleteConversation(conversationId),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ['conversations'],
            refetchType: 'active',
          });
    },
  });

  // Fetch messages for a conversation
  const useMessages = (conversationId: string) => {
    return useQuery({
      queryKey: ['messages', conversationId],
      queryFn: () => fetchMessages(conversationId)
    });
  };

  return {
    conversations,
    useSingleConversation,
    createConversationMutation,
    updateConversationMutation,
    deleteConversationMutation,
    allConversations,
    useMessages,
  };
};
