import { IoIosArrowDown } from "react-icons/io";
import ChatImage from "./ChatImage.tsx";
import { useMessages } from "../context/MessageContext.tsx";
import ChatText from "./ChatText.tsx";
import { categorizeMessagesByDay } from "../utils/helpers.ts";
import { useReplyMessage } from "../context/ReplyMessageContext.tsx";
import { useEffect, useRef } from "react";
import useModal from "../hooks/useModal.tsx";

export default function ChatBubble() {
  const { messages } = useMessages();
  const { setReplyMessage } = useReplyMessage();
  const {handleShowModal} = useModal()
  const chatEndRef = useRef<HTMLDivElement>(null);
  const id = 1;

  const categorizedMessages = categorizeMessagesByDay(messages);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="pt-14 pb-4 overflow-visible">
      {Object.entries(categorizedMessages).map(([day, dayMessages]) => (
        <div key={day} className="overflow-visible">
          <div className="text-center flex items-center justify-center my-4">
            <div className="text-white rounded-xl px-1.5 text-sm bg-gray-600">
              {day}
            </div>
          </div>
          {dayMessages.map((message, index) => {
            const isSameSenderAsPrevious =
              index > 0 && dayMessages[index - 1].senderId === message.senderId;

            const handleReplyClick = () => {
              setReplyMessage(message);
            };

            return (
              <div
                key={message.id}
                className={`chat group gap-2 overflow-visible ${
                  id === message.senderId ? "chat-end" : "chat-start"
                } `}
              >
                {!isSameSenderAsPrevious && (
                  <>
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                      </div>
                    </div>
                    <div className="chat-header px-4 pb-1 text-gray-500">
                      Obi-Wan Kenobi
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
                      id === message.senderId
                        ? "dropdown-left"
                        : "dropdown-right"
                    }`}
                  >
                    <div className="cursor-pointer" tabIndex={0} role="button">
                      <IoIosArrowDown
                        size={20}
                        color="white"
                        className="opacity-10 group-hover:opacity-50 order-last"
                      />
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content bg-gray-700 text-white w-32 rounded-md z-[100] p-2 shadow"
                    >
                      <li className="hover:bg-gray-800">
                        <a onClick={handleReplyClick}>Reply</a>
                      </li>
                      <li onClick={() => handleShowModal('forward')} className="hover:bg-gray-800">
                        <a>Forward</a>
                      </li>
                      {message.content && <li onClick={() => handleShowModal('edit')} className="hover:bg-gray-800">
                        <a>Edit</a>
                      </li>}
                      <li onClick={() => handleShowModal('confirm')} className="hover:bg-gray-800">
                        <a>Delete</a>
                      </li>
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
