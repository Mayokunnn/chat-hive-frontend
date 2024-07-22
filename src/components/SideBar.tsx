import Chats from "./Chats";
import { Filter } from "./Filter";
import Search from "./Search";

export default function SideBar() {
  const opts = [
    { label: "All", value: "all" },
    { label: "Personal", value: "personal" },
    { label: "Group", value: "group" },
    { label: "Archived", value: "archived" },
  ];
  return (
    <div className="p-8 pb-2 w-full h-full grid grid-rows-[auto_1fr] gap-5">
      <div className="h-full w-full flex justify-between items-center">
        <h2 className="text-2xl font-bold">Messages</h2>
        <div className="avatar cursor-pointer hover:opacity-80">
          <div className="w-10 rounded-full ">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
      <div className="w-full h-full grid grid-rows-[auto_auto_1fr] gap-3">
        <Search />
        <div className="w-full mx-auto">
          <Filter filterField="type" options={opts} />
        </div>
        <Chats />
      </div>
    </div>
  );
}
