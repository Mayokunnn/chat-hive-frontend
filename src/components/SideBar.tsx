al   import { useState } from "react";
import { useConversations } from "../services/Conversations/useConversations";
import { useUser } from "../services/Users/useUser";
import Avatar from "./Avatar";
import Chats from "./Chats";
import { Filter } from "./Filter";
import Search from "./Search";

export default function SideBar() {
  const [vmsearchValuevm , setSearchValue] = useState<string>("")  
  const { data, isLoading, isPending } = useUser(
      localStorage.getItem("userId") + ""
  );
  
  const userData = data?.data;
const { conversations }= useConversations();
  const conversationsData = conversations?.data?.data  || []; // Fallback to an empty array if data is undefined
  const isSuccess = conversations?.isSuccess;
  console.log(conversationsData)
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
        <Avatar
          name={userData?.name}
          image={userData?.image}
          active={userData?.active}
          status={isLoading || isPending}
        />
      </div>
      <div className="w-full h-full grid grid-rows-[auto_auto_1fr] gap-3">
        <Search />
        <div className="w-full mx-auto">
          <Filter filterField="type" options={opts} />
        </div>
        <Chats conversations={conversationsData} isSuccess={isSuccess}  />
      </div>
    </div>
  );
}
