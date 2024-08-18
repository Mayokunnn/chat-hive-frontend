import { IoIosArrowDown } from "react-icons/io";
import ChatImage from "./ChatImage";
import { useMessages } from "../context/MessageContext";
import ChatText from "./ChatText";
import { categorizeMessagesByDay } from "../utils/helpers";
import { useReplyMessage } from "../context/ReplyMessageContext";
import { useEffect, useRef } from "react";
import useModal from "../hooks/useModal";
import { useConversations } from "../services/Conversations/useConversations";
import { useConversation } from "../context/ConversationContext";
import { Message } from "../utils/types";
import ChatSkeleton from "./ChatSkeleton";
import Avatar from "./Avatar";
import Modal from "./Modal";
import DeleteMessageForm from "./DeleteMessageForm";
import EditMessageForm from "./EditMessageForm";

export default function ChatBubble() {
  const { conversation } = useConversation();
  const { setReplyMessage } = useReplyMessage();
  const { handleShowModal } = useModal();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const id = localStorage.getItem("userId");
  const { setMessages, messages } = useMessages();
  const { useMessages: fetchMessages } = useConversations();
  const { data, isSuccess, isError, isPending } = fetchMessages(
    conversation?.id + ""
  );
  console.log(messages);
  // const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isSuccess && data.data) {
      const newData = data.data;
      setMessages(newData);
    }
  }, [data, isSuccess, setMessages]);

  if (isPending || isError) {
    return <ChatSkeleton />;
  }

  if (isSuccess && messages.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <div>
          <p>You do not have any messages with {conversation?.name}</p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    const categorizedMessages = messages && categorizeMessagesByDay(messages);

    return (
      <div className="pt-14 pb-4 overflow-visible">
        {Object.entries(categorizedMessages).map(([day, dayMessages]) => (
          <div key={day} className="overflow-visible">
            <div className="text-center flex items-center justify-center my-4">
              <div className="text-secondary-content rounded-xl px-2 py-0.5 text-sm bg-secondary ">
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
                  data-id={message.id}
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
                      <div className="chat-header px-3 py-0 text-secondary font-medium">
                        {id == message.senderId ? "You" : message?.senderName}
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
                      <Modal.Open opens="menu">
                        <div
                          className="cursor-pointer bg-secondary opacity-10 group-hover:opacity-80 rounded-md"
                          tabIndex={0}
                          role="button"
                        >
                          <IoIosArrowDown
                            size={20}
                            color="white"
                            className={`opacity-10 group-hover:opacity-50`}
                          />
                        </div>
                      </Modal.Open>
                      <Modal.Window name="menu">
                        <ul>
                          <li className="hover:opacity-20">
                            <a onClick={handleReplyClick}>Reply</a>
                          </li>
                          <li
                            onClick={() => handleShowModal("forward")}
                            className="hover:opacity-20"
                          >
                            <a>Forward</a>
                          </li>
                          {message.content && id == message.senderId && (
                            <>
                              <Modal.Open opens={`editMessage-${message.id}`}>
                                <li className="hover:opacity-20">
                                  <a>Edit</a>
                                </li>
                              </Modal.Open>
                              <Modal.Window name={`editMessage-${message.id}`}>
                                <EditMessageForm
                                  id={message.id + ""}
                                  message={message.content}
                                />
                              </Modal.Window>
                            </>
                          )}
                          {id == message.senderId && (
                            <>
                              <Modal.Open opens={`deleteMessage-${message.id}`}>
                                <li className="hover:opacity-20">
                                  <a>Delete</a>
                                </li>
                              </Modal.Open>
                              <Modal.Window
                                name={`deleteMessage-${message.id}`}
                              >
                                <DeleteMessageForm id={message?.id + ""} />
                              </Modal.Window>
                            </>
                          )}
                        </ul>
                      </Modal.Window>
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
