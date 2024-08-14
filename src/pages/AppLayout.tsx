import Chat from "../components/Chat";
import ChatHeader from "../components/ChatHeader";
import Main from "../components/Main";
import SideBar from "../components/SideBar";
import { useConversation } from "../context/ConversationContext";
import { MessageProvider } from "../context/MessageContext";
import { ReplyMessageProvider } from "../context/ReplyMessageContext";
import { useUser } from "../services/Users/useUser";

export default function AppLayout() {
  const id = localStorage.getItem("userId");
  useUser(id);
  const { conversation } = useConversation();

  return (
    <Main>
      <MessageProvider>
        <ReplyMessageProvider>
          <div className=" w-full bg-base-100 relative h-full max-h-full rounded-xl p-1.5 grid grid-cols-[35%_65%]">
            <div className=" w-full">
              <SideBar />
            </div>
            {conversation ? (
              <div className="h-full w-full grid grid-rows-[auto_1fr]">
                <div className=" h-full w-full overflow-visible">
                  <ChatHeader />
                </div>
                <div className=" w-full h-full bg-primary rounded-md">
                  <Chat />
                </div>
              </div>
            ) : (
              <div className="h-full w-full bg-primary flex flex-col gap-3 items-center justify-center">
                <div className="">
                  <img src="./conversations.svg" alt="No conversations" />
                </div>
                <div>
                  <h2 className="text-2xl text-base-300">
                    Coming to mobile soon
                  </h2>
                </div>
              </div>
            )}
          </div>
        </ReplyMessageProvider>
      </MessageProvider>
    </Main>
  );
}
