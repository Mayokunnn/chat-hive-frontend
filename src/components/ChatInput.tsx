import { HiMiniPaperAirplane } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";
import FileUpload from "./FileUpload";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

export default function ChatInput() {

  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }

  })

  return (
    <div className=" h-full w-full grid grid-cols-[auto_1fr_auto] py-2 items-center gap-3 px-3">
    <div className="w-full  flex gap-2 items-center" ref={modalRef}>
      <BsEmojiSmile
        size={25}
        color="white"
        className="hover:opacity-80 cursor-pointer"
        onClick={() => setIsOpen(() => !isOpen)}
      />
      {isOpen && (
        <EmojiPicker
          className="z-10"
          style={{
            position: "absolute",
            bottom: "50px",
            left: "30px",
            zIndex: "1000",
          }}
          height={400}
          width={300}
        />
      )}
      <FileUpload />
    </div>
    <div className="w-full flex-grow-1 bg-white rounded-lg">
      <p className="min-w-52 text-black m-3 mb-0 chat-bubble bg-gray-400"> Hey</p>
      <input
        type="text"
        placeholder="Send a message"
        className="w-full h-full p-3 px-5 text-sm text-gray-700 rounded-md focus:outline-none bg-transparent"
      />
    </div>
    <div className="w-full">
      <HiMiniPaperAirplane
        size={25}
        color="white"
        className="hover:opacity-80 cursor-pointer"
      />
    </div>
  </div>
  )
}
