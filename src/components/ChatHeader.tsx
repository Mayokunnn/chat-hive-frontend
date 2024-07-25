import { CiMenuKebab } from "react-icons/ci";
import useModal from "../hooks/useModal";

export default function ChatHeader() {
  const {handleShowModal} = useModal()

  return (
    <div className="w-full h-full flex justify-between py-2 items-center px-6 overflow-visible">
      <div
        className="flex gap-3 cursor-pointer hover:opacity-80 overflow-visible"
        onClick={() => handleShowModal("profile")}
      >
        <div className="avatar">
          <div className="w-12 rounded-lg ">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold">Florencio Dorrance</h3>
          <h4 className="text-xs font-semibold flex items-center gap-1">
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
          <li onClick={() => handleShowModal("confirm")}>
            <a>Delete Conversation</a>
          </li>
          <li onClick={() => handleShowModal("confirm")} >
            <a>Block Conversation</a>
          </li>
        </ul>
       
      </div>
    </div>
  );
}
