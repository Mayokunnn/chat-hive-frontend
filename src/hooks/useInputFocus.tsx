import { useEffect } from "react";

export default function useInputFocus(replyMessage: any, inputRef: React.RefObject<HTMLTextAreaElement>) {
  useEffect(() => {
    if (replyMessage && inputRef.current) {
      inputRef.current.focus();
    }
  }, [replyMessage, inputRef]);
}
