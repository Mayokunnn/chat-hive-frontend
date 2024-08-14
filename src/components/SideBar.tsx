import { useUser } from "../services/Users/useUser";
import Avatar from "./Avatar";
import Chats from "./Chats";
import { Filter } from "./Filter";
import Search from "./Search";

export default function SideBar() {
  const { data, isLoading, isPending } = useUser(localStorage.getItem('userId'));
  const userData = data?.data;
  const opts = [
    { label: "All", value: "all" },
    { label: "Personal", value: "personal" },
    { label: "Group", value: "group" },
    { label: "Archived", value: "archived" },
  ];

  isLoading && isPending && (
    <div className="p-8 pb-2 w-full h-full grid bg-neutral-content grid-rows-[auto_1fr] gap-5">
      <div className="h-full w-full flex justify-between items-center">
        <h2 className="text-2xl font-bold">Messages</h2>
        <div className={`skeleton`}>
          <div className=" skeleton w-16 rounded-full"></div>
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

  return (
    <div className="p-8 pb-2 w-full h-full grid grid-rows-[auto_1fr] gap-5">
      <div className="h-full w-full flex justify-between items-center">
        <h2 className="text-2xl font-bold">Messages</h2>
        <Avatar name={userData?.name} image={userData?.image} active={userData?.active} status={isLoading || isPending}  />
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
