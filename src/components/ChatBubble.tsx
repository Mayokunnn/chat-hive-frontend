import { IoIosArrowDown } from "react-icons/io";
import ChatImage from "./ChatImage.tsx";
import { useMessages } from "../context/MessageContext.tsx";
import ChatText from "./ChatText.tsx";
import { categorizeMessagesByDay } from "../utils/helpers.ts";
import { useReplyMessage } from "../context/ReplyMessageContext.tsx";
import { useEffect, useRef } from "react";
import useModal from "../hooks/useModal.tsx";
import { useConversations } from "../services/Conversations/useConversations.ts";
import { useConversation } from "../context/ConversationContext.tsx";
import { Message } from "../utils/types.ts";
import ChatSkeleton from "./ChatSkeleton.tsx";
import Avatar from "./Avatar.tsx";
import { useFetchMessages } from "../services/Messages/useFetchMessages.ts";
import { useModalContext } from "../context/ModalContext.tsx";

export default function ChatBubble() {
  const { conversation } = useConversation();
  const { setReplyMessage } = useReplyMessage();
  const { handleShowModal } = useModal();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const id = localStorage.getItem("userId");
  const { setMessages, messages, removeMessage } = useMessages();
  const { useMessages: fetchMessages,  } = useConversations();
  const { data, isSuccess, isError, isPending } = fetchMessages(conversation?.id);
  const {setModalMessage, setModalAction, setType} = useModalContext()
  const {deleteMessageMutation} = useFetchMessages(conversation?.id)
  const {mutate: deleteMessage} = deleteMessageMutation

  const handleDelete = (id: string) => {
    handleShowModal("confirm");
    setModalMessage("Are you sure you want to delete this message?");
    setType("delete");
    setModalAction(() => () => {
      removeMessage(id);
      deleteMessage(id);
    });
  };
  


  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);



  useEffect(() => {
    if (isSuccess && data?.data) {
      setMessages(data?.data);
    }
  }, [data, isSuccess, setMessages]);



  if (isPending || isError) {
    return <ChatSkeleton />;
  }

  if(isSuccess && messages.length ==0){
    return <div className="flex items-center justify-center">
      <div>
        <p>You do not have any message with {conversation?.name}</p>
      </div>
    </div>
  }

  if (isSuccess) {
    const categorizedMessages = messages && categorizeMessagesByDay(messages);

    return (
      <div className="pt-14 pb-4 overflow-visible">
        {Object.entries(categorizedMessages).map(([day, dayMessages]) => (
          <div key={day} className="overflow-visible">
            <div className="text-center flex items-center justify-center my-4">
              <div className="text-white rounded-xl px-1.5 text-sm bg-gray-600">
                {day}
              </div>
            </div>
            {dayMessages?.map((message: Message, index: number) => {
              const isSameSenderAsPrevious =
                index > 0 &&
                dayMessages[index - 1].senderId === message.senderId;

              const handleReplyClick = () => {
                setReplyMessage(message);
              };

              return (
                <div
                  key={message.id}
                  className={`chat group gap-x-2 overflow-visible ${
                    id == message.senderId ? "chat-end" : "chat-start"
                  } `}
                >
                  {!isSameSenderAsPrevious && (
                    <>
                      <div className="chat-image avatar">
                        <Avatar
                          name={message.senderName}
                          image={message.senderImage}
                          size={"small"}
                        />
                      </div>
                      <div className="chat-header px-3 py-0 text-gray-300">
                        {id == message.senderId ? "You" :message?.senderName}
                      </div>
                    </>
                  )}
                  <div className="flex items-center gap-x-2 overflow-visible">
                    <ChatText
                      message={message}
                      sameSender={isSameSenderAsPrevious}
                    />
                    <ChatImage
                      message={message}
                      sameSender={isSameSenderAsPrevious}
                    />
                    <div
                      className={`dropdown dropdown-top overflow-visible ${
                        id == message.senderId
                          ? "dropdown-left"
                          : "dropdown-right"
                      }`}
                    >
                      <div
                        className="cursor-pointer"
                        tabIndex={0}
                        role="button"
                      >
                        <IoIosArrowDown
                          size={20}
                          color="white"
                          className={`opacity-10 group-hover:opacity-50`}
                        />
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-gray-700 text-white w-32 rounded-md z-[100] p-2 shadow"
                      >
                        <li className="hover:bg-gray-800">
                          <a onClick={handleReplyClick}>Reply</a>
                        </li>
                        <li
                          onClick={() => handleShowModal("forward")}
                          className="hover:bg-gray-800"
                        >
                          <a>Forward</a>
                        </li>
                        {message.content  && id == message.senderId && (
                          <li
                            onClick={() => handleShowModal("edit")}
                            className="hover:bg-gray-800"
                          >
                            <a>Edit</a>
                          </li>
                        )}
                        {id == message.senderId &&
                         <li
                          onClick={() => handleDelete(message.id)}
                          className="hover:bg-gray-800"
                        >
                          <a>Delete</a>
                        </li>}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    );
  }
}
