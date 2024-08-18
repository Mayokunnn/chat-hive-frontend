import { useForm} from "react-hook-form";
import { useReplyMessage } from "../context/ReplyMessageContext";
import { useMessages } from "../context/MessageContext";
import { useConversation } from "../context/ConversationContext";
import { useFetchMessages } from "../services/Messages/useFetchMessages";

export function useChatForm() {
  const { replyMessage, setReplyMessage } = useReplyMessage();
  const { addMessage } = useMessages();
  
  const { control, handleSubmit, setValue, getValues, reset } = useForm<{ message: string }>({
    defaultValues: { message: "" }
  });
  const {conversation} = useConversation();
  const {sendMessageMutation} = useFetchMessages(conversation?.id)
  const {mutate: sendMessage, isSuccess, isPending} = sendMessageMutation

  const onEmojiClick = (emojiObject: { emoji: string }) => {
    const currentMessage = getValues("message");
    setValue("message", currentMessage + emojiObject.emoji);
  };

  const onSubmit = (data: { message: string }) => {
    if(data.message.length <1 ){
      return false;
    }

    const newMessage = {
      content: data.message,
      senderId: localStorage.getItem("userId"), // Replace with actual sender ID
      conversationId: conversation?.id, // Replace with actual conversation ID
      type: "text",
      updatedAt: new Date().toISOString(),
      replyTo: replyMessage? replyMessage.id : null ,
    };

    addMessage(newMessage);
    sendMessage(newMessage);
    setReplyMessage(null);
    reset();
  };

  return { control, handleSubmit, onEmojiClick, onSubmit, setValue, getValues, isSuccess, isPending };
}
