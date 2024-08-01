// src/hooks/useMessages.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchMessages, 
  sendMessage, 
  forwardMessage, 
  updateMessageStatus, 
  editMessage, 
  deleteMessage 
} from './messages';
import { Message, MessageData } from '../../utils/types';
import toast from 'react-hot-toast';

export const useFetchMessages = (conversationId: string) => {
  const queryClient = useQueryClient();

  // Fetch messages for a conversation
  const messagesQuery = useQuery<MessageData>({
    queryKey: ['messages', conversationId],
    queryFn: () => fetchMessages(conversationId),
  });

  // Send a message
  const sendMessageMutation = useMutation({
    mutationFn: (message: Partial<Message>) => sendMessage(conversationId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['messages', conversationId],
        refetchType: 'active',
      });
    },
    onError:(data) => {
      // toast.error(data)
      console.log(data)
    }
  });

  // Forward a message
  const forwardMessageMutation = useMutation({
    mutationFn: (messageId: string) => forwardMessage(messageId, conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['messages', conversationId],
        refetchType: 'active',
      });
    },
  });

  // Update message status
  const updateMessageStatusMutation = useMutation({
    mutationFn: ({ messageId, status }: { messageId: string; status: string }) =>
      updateMessageStatus(messageId, status, conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['messages', conversationId],
        refetchType: 'active',
      });
    },
  });

  // Edit a message
  const editMessageMutation = useMutation({
    mutationFn: ({ messageId, message }: { messageId: string; message: Partial<Message> }) =>
      editMessage(messageId, message, conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['messages', conversationId],
        refetchType: 'active',
      });
    },
  });

  // Delete a message
  const deleteMessageMutation = useMutation({
    mutationFn: (messageId: string) => deleteMessage(messageId, conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['messages', conversationId],
        refetchType: 'active',
      });
    },
    onError: (data) => {
      console.log(data);
      toast.error('There was a problem deleting this message')
    }
  });

  return {
    messagesQuery,
    sendMessageMutation,
    forwardMessageMutation,
    updateMessageStatusMutation,
    editMessageMutation,
    deleteMessageMutation,
  };
};