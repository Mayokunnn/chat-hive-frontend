import { CiMenuKebab } from "react-icons/ci";

export default function ChatHeader() {
  return (
    <div className="w-full h-full flex justify-between items-center px-6">
      <div className="flex gap-3 cursor-pointer hover:opacity-80">
        <div className="avatar">
          <div className="w-10 rounded-lg ">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="space-y-0">
            <h3 className="text-base font-semibold">Florencio Dorrance</h3>
            <h4 className="text-xs font-semibold flex items-center gap-1"> <p className="bg-green-500 h-2 w-2 rounded-full"></p> Online</h4>
        </div>
      </div>
      <div className="btn btn-ghost px-2 ">
        <CiMenuKebab size={20} color="black"/>
      </div>
    </div>
  );
}
