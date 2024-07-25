import { useState } from "react";
import ReactDOM from "react-dom";
import useModal from "../hooks/useModal";

export default function EditModal() {
  const [value, setValue] = useState(
    "Are you sure you want to delete this conversation?"
  );
  const { handleCloseModal } = useModal();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(() => e.target.value);
  };

  return ReactDOM.createPortal(
    <dialog id="edit" className="modal">
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
            onClick={() => handleCloseModal("edit")}
          >
            Cancel
          </button>
          <button className="btn btn-error">Edit</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>,
    document.getElementById?.("root") // This is where the portal will render
  );
}
