import { useConversations } from "../services/Conversations/useConversations";
import { Conversation } from "../utils/types";
import ChatItem from "./ChatItem";
import { PiChatTeardropDotsFill } from "react-icons/pi";
import Modal from "./Modal";
import CreateConversationForm from "./CreateConversationForm";

export default function Chats() {
  const { conversations: conversationsData } = useConversations();

  const { data: conversations, isSuccess } = conversationsData;

  // console.log(conversations)
  if (isSuccess && conversations?.length == 0) {
    return (
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="">
          <img src="./conversations.svg" alt="No conversations" />
        </div>
        <Modal.Open opens="create-conversation">
          <button className="btn bg-secondary text-secondary-content">
            Add new conversation
          </button>
        </Modal.Open>
        <Modal.Window name="create-conversation">
          <CreateConversationForm />
        </Modal.Window>
      </div>
    );
  }

  return (
    <div className=" w-full h-full relative">
      <div className="absolute bottom-10 right-5 cursor-pointer">
        <Modal.Open opens="create-conversation">
          <PiChatTeardropDotsFill color="#7F265B" size={50} />
        </Modal.Open>
        <Modal.Window name="create-conversation">
          <CreateConversationForm />
        </Modal.Window>
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
