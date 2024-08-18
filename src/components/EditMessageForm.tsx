import { useState } from "react";
import { useMessages } from "../context/MessageContext";

interface Props {
  message: string;
  id: string;
  onCloseModal?: () => void;
}

export default function EditMessageForm({ message, id, onCloseModal }: Props) {
  const [value, setValue] = useState(message);
  const { updateMessage } = useMessages();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(() => e.target.value);
  };

  function onEdit() {
    updateMessage(id, value);

    onCloseModal?.();
  }

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-lg">Edit</h3>
      <textarea
        className="px-3 py-3 outline-none focus:outline-none bg-gray-300 rounded-md w-full mr-3 text-wrap"
        onChange={handleChange}
        autoComplete="none"
        rows={1}
        wrap="soft"
        value={value}
      />
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={onCloseModal}>
          Cancel
        </button>
        <button className="btn btn-error capitalize" onClick={onEdit}>
          Edit
        </button>
      </div>
    </div>
  );
}
