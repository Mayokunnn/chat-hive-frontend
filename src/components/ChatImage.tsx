import { getTime } from "../utils/helpers.ts";
import { Message } from "../utils/types.ts";

interface Props {
  message: Message;
  sameSender: boolean;
  reply?: boolean;
}

export default function ChatImage({ message, sameSender, reply }: Props) {
  const id = localStorage.getItem("userId");
  return (
    message.url &&
    message.messageType === "image" && (
      <div
        className={`${reply ? "w-full" : "relative "}  ${
          id == message.senderId ? "order-last" : "order-first"
        } ${sameSender ? "ml-10" : ""} `}
      >
        <img
          className={`chat-bubble p-1 contain  ${
            reply
              ? "bg-gray-700 mb-1 cursor-pointer max-h-[200px] w-full opacity-60 pb-2"
              : "pb-4"
          } `}
          src={message.url}
          alt={message.url}
        />
        {!reply && (
          <time
            className={`text-[10px] absolute bottom-[-0px] text-white group-hover:opacity-50 ${
              id == message.senderId ? "left-2" : "left-2"
            }  `}
          >
            {getTime(message.updatedAt)}
          </time>
        )}
      </div>
    )
  );
}
