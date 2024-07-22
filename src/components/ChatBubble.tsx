import getTime from "../utils/helpers.ts";

interface Message {
  id: number;
  content?: string | null;
  senderId: number;
  conversationId: number;
  messageType: string;
  url?: string | null;
  createdAt: string; // ISO string format or Date object
}

interface Messages {
  messages: Message[];
}

export default function ChatBubble({ messages }: Messages) {


  const id = 1;
  return messages.map((message, index) => {
    const isSameSenderAsPrevious =
      index > 0 && messages[index - 1].senderId === message.senderId;

    return (
      <div
        key={message.id}
        className={`chat gap-1 ${
          id == message.senderId ? "chat-end" : "chat-start"
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
        <div className="flex items-end gap-x-2">
          {message.content && (
            <div
              className={`chat-bubble min-w-48 text-sm relative order-1  ${
                isSameSenderAsPrevious && id !== message.senderId
                  ? "ml-10"
                  : isSameSenderAsPrevious && id == message.senderId
                  ? "mr-10 "
                  : "m-0"
              }`}
            >
              {message.content}
            </div>
          )}
          {message.url && message.messageType === "image" && (
            <img
              className={`chat-bubble p-1 max-w-[50%] ${
                isSameSenderAsPrevious ? "ml-10" : ""
              }`}
              src={message.url}
              alt={message.url}
            />
          )}
          <time
            className={`text-[10px]  ${
              id !== message.senderId ? "order-1" : ""
            } opacity-10 text-white hover:opacity-50`}
          >
            {getTime(message.createdAt)}
          </time>
        </div>
      </div>
    );
  });
}
