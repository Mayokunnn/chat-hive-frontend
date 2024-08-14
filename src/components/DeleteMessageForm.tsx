import { useMessages } from "../context/MessageContext";
import useModal from "../hooks/useModal";

interface Props{
  id: string;
}

export default function DeleteMessageForm({id}: Props) {
  const { removeMessage } = useMessages();
  const { handleCloseModal } = useModal();

  function onDelete(){
    removeMessage(id);
  }

  return (
      <div className="modal-box">
        <h3 className="font-bold text-xl">Are you sure you want to delete this message?</h3>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={() => handleCloseModal(`deleteMessage-${id}`)}>Cancel</button>
          <button className="btn btn-error capitalize" onClick={onDelete}>Delete</button>
        </div>
      </div>
  );
}
