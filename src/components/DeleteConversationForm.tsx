import { useMessages } from "../context/MessageContext";
import useModal from "../hooks/useModal";
import { useConversations } from "../services/Conversations/useConversations";

interface Props{
  id: string;
}

export default function DeleteConversationForm({id}: Props) {
  const { handleCloseModal } = useModal();
  const {deleteConversationMutation} = useConversations()
  const {mutate} = deleteConversationMutation

  function onDelete(){
    mutate(id)
    console.log(id);
  }

  return (
      <div className="modal-box">
        <h3 className="font-bold text-xl">Are you sure you want to delete this message?</h3>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={() => handleCloseModal(`deleteConversation-${id}`)}>Cancel</button>
          <button className="btn btn-error capitalize" onClick={onDelete}>Delete</button>
        </div>
      </div>
  );
}
