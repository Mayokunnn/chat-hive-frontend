import Chat from "../components/Chat";
import ChatHeader from "../components/ChatHeader";
import Main from "../components/Main";
import SideBar from "../components/SideBar";

export default function AppLayout() {
  return (
    <Main>
      <div className="bg-white w-full h-full max-h-full rounded-xl p-1.5 grid grid-cols-[35%_65%]">
        <div className=" w-full">
          <SideBar />
        </div>
        <div className="h-full w-full grid grid-rows-[auto_1fr]">
          <div className="p-2 h-full w-full">
            <ChatHeader />
          </div>
          <div className=" w-full h-full bg-gray-800 rounded-md">
            <Chat/>
          </div>
        </div>
      </div>
    </Main>
  );
}
