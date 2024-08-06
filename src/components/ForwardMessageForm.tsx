import { useState } from "react";
import ReactDOM from "react-dom";
import useModal from "../hooks/useModal";

export default function ForwardModal() {
  const [value, setValue] = useState<string>();
  const { handleCloseModal } = useModal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(() => e.target.value);
  };

  return ReactDOM.createPortal(
    <dialog id="forward" className="modal">
      <div className="modal-box space-y-6">
        <h3 className="font-bold text-lg">Forward</h3>
        <input
          className="px-3 py-3 outline-none focus:outline-none bg-gray-300 rounded-md w-full mr-3 text-wrap"
          onChange={handleChange}
          autoComplete="none"
          value={value}
          placeholder="Search"
        />

        <h2 className="m-1">Conversations</h2>

        <ul className="max-h-[400px]">
          <li className="flex btn-ghost items-center p-2 py-3 rounded-md cursor-pointer gap-2">
            <div className="avatar">
              <div className="w-10 rounded-lg ">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="w-full flex justify-between ">
              <div className="flex flex-col justify-between">
                <h3 className="text-md font-semibold">Florencio Dorrance</h3>
                <p className="text-xs text-gray-500">Ok, see you later</p>
              </div>
            </div>
          </li>
        </ul>
        <div className="modal-action">
          <button
            className="btn btn-ghost"
            onClick={() => handleCloseModal("forward")}
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
