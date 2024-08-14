import { getTime } from "../utils/helpers";
import { useConversation } from "../context/ConversationContext";
import { useConversations } from "../services/Conversations/useConversations";
import { Conversation } from "../utils/types";
import Avatar from "./Avatar";

interface Props {
  conversation: Conversation;
}

export default function ChatItem({ conversation }: Props) {
  const { conversations: conversationsData } = useConversations();
  const {setConversation} = useConversation();
  const { isLoading } = conversationsData;

  if (isLoading) {
    return (
      <li className="flex skeleton gap-2" >
        <div className="avatar skeleton">
          <div className=" skeleton w-12 rounded-lg ">
            <img src="" className="skeleton" />
          </div>
        </div>
        <div className="w-full flex justify-between ">
          <div className="flex flex-col justify-between">
            <h3 className="text-md font-semibold skeleton"></h3>
            <p className="text-xs text-gray-500 skeleton"></p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-gray-500 skeleton"></p>
            <p className="text-[10px] text-white skeleton bg-gray-500 rounded-full py-0.25 px-[0.3rem]">
              
            </p>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="flex items-center p-2 py-3 hover:bg-neutral rounded-md cursor-pointer gap-2" onClick={() => setConversation(conversation)}>
      <Avatar name={conversation?.name} image={conversation?.image} active={conversation?.active} />
      <div className="w-full flex justify-between ">
        <div className="flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-primary-content">{conversation?.name}</h3>
          <p className="text-sm text-primary-content">{conversation?.lastMessage ? conversation.lastMessage.length > 250 ? "Photo" : conversation.lastMessage : ""}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-primary-content">{conversation.lastMessage && getTime(conversation?.lastMessageTime)}</p>
          <p className="text-[10px] text-secondary-content bg-secondary rounded-full py-0.25 px-[0.3rem]">
          {conversation?.unreadMessages > 0 && conversation?.unreadMessages }
          </p>
        </div>
      </div>
    </li>
  );
}
