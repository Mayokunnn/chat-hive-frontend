import { getTime } from "../utils/helpers.ts";
import { MessageItem } from "../utils/types.ts";
import ChatReply from "./ChatReply.tsx";

interface Props {
  message: MessageItem;
  sameSender: boolean;
  reply?: boolean;
}

export default function ChatText({ message, sameSender, reply }: Props) {
  const id = localStorage.getItem("userId");
  return (
    message.content && (
      <div
        className={`chat-bubble w-full min-w-24 max-w-96 whitespace-pre font-normal text-wrap break-all text-[0.9rem] overflow-visible relative ${
          reply ? "bg-gray-700 mb-1 cursor-pointer" : " p-2 px-3"
        }  ${
          id == message.senderId ? "order-last pr-8" : "order-first pl-8"
        }  ${
          sameSender && id != message.senderId && !reply
            ? "ml-12"
            : sameSender && id == message.senderId && !reply
            ? "mr-10 "
            : "m-0"
        }`}
      >
        {message.reply && (
          <ChatReply message={message.reply} sameSender={sameSender} />
        )}
        {message.content}
        {!reply && (
          <time
            className={`text-[10px] absolute bottom-0 text-white group-hover:opacity-50 ${
              id === message.senderId ? "right-2" : "left-2"
            }  `}
          >
            {getTime(message.createdAt)}
          </time>
        )}
      </div>
    )
  );
}
