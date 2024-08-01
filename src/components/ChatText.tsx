import {getTime} from "../utils/helpers.ts";
import { MessageItem } from "../utils/types.ts";
import ChatReply from "./ChatReply.tsx";

interface Props {
  message: MessageItem;
  sameSender: boolean;
  reply? : boolean;
}

export default function ChatText({ message, sameSender , reply}: Props) {
const id = localStorage.getItem("userId");
  return (
    message.content && (
      <div
        className={`chat-bubble max-w-96 text-sm relative ${reply ? "bg-gray-700 mb-1 cursor-pointer" : " p-2 px-3 pb-4" }  ${
          id == message.senderId ? "order-last" : "order-first"
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
       {!reply && <time
          className={`text-[10px] absolute bottom-0 text-white group-hover:opacity-50 ${
            id === message.senderId ? "right-3" : "left-2"
          }  `}
        >
          {getTime(message.createdAt)}
        </time>}
      </div>
    )
  );
}
