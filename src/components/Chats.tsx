import { useConversations } from "../services/Conversations/useConversations";
import { Conversation } from "../utils/types";
import ChatItem from "./ChatItem";
import { PiChatTeardropDotsFill } from "react-icons/pi";

export default function Chats() {
  const { conversations: conversationsData, } = useConversations();
  
  const {data: conversations, isSuccess} = conversationsData;

  // console.log(conversations)
  if (isSuccess && conversations?.length === 0) {
    return (
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="">
          <img src="./conversations.svg" alt="No conversations" />
        </div>
        <div>
          <button className="btn btn-neutral">Add new conversation</button>
        </div>
      </div>
    );
  }

  return (
    <div className=" w-full h-full relative">
      <div className="absolute bottom-10 right-10 cursor-pointer">
        <PiChatTeardropDotsFill color="#021526" size={40} />
      </div>
      <ul className=" w-full h-full overflow-auto">
        {conversations &&
          conversations?.map((conversation: Conversation) => (
            <ChatItem key={conversation?.id} conversation={conversation} />
          ))}
      </ul>
    </div>
  );
}
