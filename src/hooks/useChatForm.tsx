import { useForm} from "react-hook-form";
import { useReplyMessage } from "../context/ReplyMessageContext";
import { useMessages } from "../context/MessageContext";

export function useChatForm() {
  const { replyMessage, setReplyMessage } = useReplyMessage();
  const { addMessage } = useMessages();
  
  const { control, handleSubmit, setValue, getValues, reset } = useForm<{ message: string }>({
    defaultValues: { message: "" }
  });

  const onEmojiClick = (emojiObject: { emoji: string }) => {
    const currentMessage = getValues("message");
    setValue("message", currentMessage + emojiObject.emoji);
  };

  const onSubmit = (data: { message: string }) => {
    const newMessage = {
      content: data.message,
      senderId: 1, // Replace with actual sender ID
      conversationId: 1, // Replace with actual conversation ID
      messageType: "text",
      createdAt: new Date().toISOString(),
      reply: replyMessage,
    };

    addMessage(newMessage);
    setReplyMessage(null);
    reset();
  };

  return { control, handleSubmit, onEmojiClick, onSubmit, setValue, getValues };
}
