import { useState } from "react";
import useModal from "../hooks/useModal";
import { useMessages } from "../context/MessageContext";

interface Props {
  message: string;
  id: string;
}

export default function EditMessageForm({ message, id }: Props) {
  const [value, setValue] = useState(message);
  const { updateMessage } = useMessages();
  const { handleCloseModal } = useModal();
  
  // const initialValue = value;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(() => e.target.value);
  };

  function onEdit() {
    updateMessage(id, value);
    handleCloseModal(`editMessage-${id}`);
  }

  return (
    <div className="modal-box space-y-6">
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
        <button
          className="btn btn-ghost"
          onClick={() => {
            console.log(`editMessage-${id}`)
            handleCloseModal(`editMessage-${id}`);
          }}
        >
          Cancel
        </button>
        <button className="btn btn-error" onClick={onEdit}>
          Edit
        </button>
      </div>
    </div>
  );
}
