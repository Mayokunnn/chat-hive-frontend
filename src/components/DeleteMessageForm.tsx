import { useMessages } from "../context/MessageContext";

interface Props{
  id: string;
  onCloseModal?: () => void
}

export default function DeleteMessageForm({id, onCloseModal}: Props) {
  const { removeMessage } = useMessages();

  function onDelete(){
    removeMessage(id);

    onCloseModal
  }

  return (
      <div className="space-y-6">
        <h3 className="font-bold text-xl">Are you sure you want to delete this message?</h3>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onCloseModal}>Cancel</button>
          <button className="btn btn-error capitalize" onClick={onDelete}>Delete</button>
        </div>
      </div>
  );
}
