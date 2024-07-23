import getTime from "../utils/helpers.ts";
import { MessageItem } from "../utils/types.ts";

interface Props {
    message: MessageItem;
    sameSender: boolean;
    reply?: boolean;
  }

export default function ChatImage({ message, sameSender, reply}: Props) {
    const id =1;
  return (
    message.url && message.messageType === "image" && (
        <div className={reply ? "w-full" :"relative  max-w-[60%]"}>
          <img
            className={`chat-bubble p-1  ${reply ? "bg-gray-700 mb-1 cursor-pointer max-h-[200px] w-full opacity-60 pb-2" : "pb-4" } ${
              sameSender ? "ml-10" : ""
            }`}
            src={message.url}
            alt={message.url}
          />
          {!reply && <time
            className={`text-[10px] absolute bottom-[-0px] opacity-10 text-white group-hover:opacity-50 ${
              id === message.senderId ? "right-2" : "left-2"
            }  `}
          >
            {getTime(message.createdAt)}
          </time>}
        </div>
      )
  )
}
