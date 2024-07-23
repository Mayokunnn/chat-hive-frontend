import { MessageItem } from "../utils/types.ts";
import ChatImage from "./ChatImage.tsx";
import ChatText from "./ChatText.tsx";

interface Props {
  message: MessageItem;
  sameSender: boolean;
}

export default function ChatReply({ message, sameSender }: Props) {
  return (
    <>
      <ChatText message={message} sameSender={sameSender} reply={true}/>
      <ChatImage message={message} sameSender={sameSender} reply={true}/>
    </>
  );
}
