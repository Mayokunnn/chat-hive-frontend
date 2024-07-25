import { HiMiniPaperAirplane } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";
import FileUpload from "./FileUpload";
import EmojiPicker from "emoji-picker-react";
import { useChatForm } from "../hooks/useChatForm";
import { useEmojiPicker } from "../hooks/useEmojiPicker";
import { useReplyMessage } from "../context/ReplyMessageContext";
import { Controller } from "react-hook-form";
import { useRef } from "react";
import useInputFocus from "../hooks/useInputFocus";

export default function ChatInput() {
  const { isOpen, modalRef, toggleEmojiPicker } = useEmojiPicker();
  const { replyMessage, setReplyMessage } = useReplyMessage();
  const { control, handleSubmit, onEmojiClick, onSubmit } = useChatForm();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useInputFocus(replyMessage ,inputRef)


  const handleInputChange = (value: string) => {
    if (value.trim() === '') {
      setReplyMessage(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full w-full grid grid-cols-[auto_1fr_auto] py-2 items-center gap-3 px-3"
    >
      <div className="w-full flex gap-2 items-center" ref={modalRef}>
        <BsEmojiSmile
          size={25}
          color="white"
          className="hover:opacity-80 cursor-pointer"
          onClick={toggleEmojiPicker}
        />
        {isOpen && (
          <EmojiPicker
            onEmojiClick={onEmojiClick}
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
        {replyMessage && replyMessage.content && (
          <p className="min-w-52 text-black m-3 mb-0 chat-bubble bg-gray-300">
            {replyMessage.content}
          </p>
        )}
        {replyMessage && replyMessage.url && (
          <img
            className="max-w-64 mb-0 chat-bubble opacity-80 bg-gray-300"
            src={replyMessage.url}
          />
        )}
        <Controller
          name="message"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <textarea
              {...field}
              // type="text"
              placeholder="Send a message"
              className="w-full h-full p-3 px-5 text-gray-700 rounded-md text-base focus:outline-none bg-transparent"
              autoComplete="off"
              rows={1} // Adjust this to control the height
      wrap="soft" // Ensures text wrapping
              onChange={(e) => {
                field.onChange(e); // Ensure react-hook-form handles the change
                handleInputChange(e.target.value); // Handle input value change
              }}
              onKeyDown={(e) => {
                if (e.key === 'Backspace') {
                  handleInputChange(e.currentTarget.value); // Clear reply message on backspace if empty
                }
              }}
              ref={inputRef}
            />
          )}
        />
      </div>
      <div className="w-full">
        <button type="submit">
          <HiMiniPaperAirplane
            size={25}
            color="white"
            className="hover:opacity-80 cursor-pointer"
          />
        </button>
      </div>
    </form>
  );
}
