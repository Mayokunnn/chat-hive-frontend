import ChatBubble from "./ChatBubble";
import { IoMdArrowDown } from "react-icons/io";
import { useRef } from "react";
import useScroll from "../hooks/useScroll";
import ChatInput from "./ChatInput";

export default function Chat() {
  const scrollableRef = useRef<HTMLUListElement>(null); // Adjust type based on your actual element
  const { showButton } = useScroll(scrollableRef);

  const scrollToBottom = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scroll({
        top: scrollableRef.current.scrollHeight,
        behavior: "smooth", // Smooth scrolling behavior
      });
    }
  };



  return (
        <div className="relative h-full w-full pt-3 px-2 grid grid-rows-[1fr_auto] bg-chat bg-cover">
          {showButton && (
            <IoMdArrowDown
              onClick={scrollToBottom}
              color="white"
              size={20}
              className="absolute bottom-20 right-10 z-20 cursor-pointer"
            />
          )}

          <ul
            className="w-full relative h-full overflow-auto flex flex-col justify-end"
            ref={scrollableRef}
            id="messageBody"
          >
            <ChatBubble />
          </ul>
          <ChatInput />
        </div>
  );
}
