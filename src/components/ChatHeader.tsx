import { CiMenuKebab } from "react-icons/ci";
import useModal from "../hooks/useModal";
import { useConversation } from "../context/ConversationContext";
import Avatar from "./Avatar";
import { useEffect } from "react";
import { useModalContext } from "../context/ModalContext";
import { useConversations } from "../services/Conversations/useConversations";

export default function ChatHeader() {
  const { handleShowModal } = useModal();
  const { conversation , setConversation} = useConversation();
  const {setModalMessage, setModalAction, setType} = useModalContext()
  const {deleteConversationMutation} = useConversations()
  const {mutate: deleteConversation, isError, isSuccess, isPending} = deleteConversationMutation

  useEffect(() => {
    document.title = `${conversation?.name} | Chat Hive`
  }, [conversation])

  const handleDelete = () => {
    handleShowModal("confirm");
    setConversation(null);
    setModalMessage("Are you sure you want to delete " + conversation?.name + "?"  )
    setType("delete")
    setModalAction(() => deleteConversation(conversation?.id))
  }

  return (
    <div className="w-full h-full flex justify-between py-2 items-center px-6 overflow-visible">
      <div
        className="flex gap-3 cursor-pointer hover:opacity-80 overflow-visible"
        onClick={() => handleShowModal("profile")}
      >
        <Avatar name={conversation?.name} image={conversation?.image} active={conversation?.active} />
        <div className="flex flex-col gap-1 justify-center">
          <h3
            className={`text-lg font-semibold ${
              !conversation ? "skeleton" : " "
            }`}
          >
            {conversation?.name}
          </h3>
          <h4 className="text-sm font-semibold flex items-center gap-1">
            {" "}
            <p className="bg-green-500 h-2 w-2 rounded-full"></p> Online
          </h4>
        </div>
      </div>
      <div className="dropdown dropdown-end dropdown-bottom overflow-visible">
        <div className="btn btn-ghost px-2 " role="button" tabIndex={0}>
          <CiMenuKebab size={20} color="black" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-gray-50 rounded-md p-2 min-w-52 z-20 shadow"
        >
          <li onClick={() => handleShowModal("profile")}>
            <a>Profile</a>
          </li>
          <li role="button" aria-disabled={isPending} onClick={handleDelete}>
            <a >Delete Conversation</a>
          </li>
          <li onClick={() => handleShowModal("confirm")}>
            <a>{conversation?.blocked && "Un"}Block Conversation</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
