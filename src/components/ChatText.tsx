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
        className={`chat-bubble w-full min-w-16 max-w-96 whitespace-pre font-normal text-wrap break-all text-[0.8rem] relative ${
          reply ? "bg-neutral text-black opacity-70 text-left mb-1 cursor-pointer overflow-hidden" : "py-2 px-3 overflow-visible bg-secondary text-secondary-content"
        }  ${
          id == message.senderId ? "order-last " : "order-first "
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
            className={`text-[8px] absolute bottom-0 text-secondary-content group-hover:opacity-50 ${
              id === message.senderId ? "right-2" : "left-2"
            }  `}
          >
            {getTime(message.updatedAt)}
          </time>
        )}
      </div>
    )
  );
}
