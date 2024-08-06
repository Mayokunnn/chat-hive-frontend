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
    enabled: !!conversationId,
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
    mutationFn: ({ id, read }: { id: string; read: boolean }) =>
      updateMessageStatus(id, read, conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [['messages', conversationId], 'conversations'],
        refetchType: 'active',
      });
      toast.success("Read")
    },
  });

  // Edit a message
  const editMessageMutation = useMutation({
    mutationFn: ({ messageId , message }: { messageId: string; message: string }) =>
     { 
      const messagePayload = {
        content:message,
        conversationId,
        senderId: localStorage.getItem('userId'), 
        type: 'text',
        messageId,
      }
      editMessage(messageId, messagePayload, conversationId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['messages', conversationId],
        refetchType: 'active',
      });
    },
    onError:(data) => {
      console.log(data)
    }
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
