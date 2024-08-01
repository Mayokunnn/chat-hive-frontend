
export default function ChatSkeleton() {
  return (
    <>
    <div className="chat chat-start text-white ">
      <div className="chat-image avatar  skeleton">
        <div className="w-10 rounded-full  skeleton"></div>
      </div>
      <div className="chat-header flex gap-3 skeleton">
        <p className="skeleton">Obi-Wan Kenobi</p>{" "}
      </div>
      <div className="chat-bubble skeleton">You were the Chosen One!</div>
    </div>
    <div className="chat chat-end text-white">
      <div className="chat-image avatar skeleton">
        <div className="w-10 rounded-full  skeleton"></div>
      </div>
      <div className="chat-header flex gap-3 skeleton">
        <p className="skeleton">Anakin</p>
      </div>
      <div className="chat-bubble  skeleton">I hate you!</div>
    </div>
    <div className="chat chat-start text-white ">
      <div className="chat-image avatar  skeleton">
        <div className="w-10 rounded-full  skeleton"></div>
      </div>
      <div className="chat-header flex gap-3 skeleton">
        <p className="skeleton">Obi-Wan Kenobi</p>{" "}
      </div>
      <div className="chat-bubble skeleton">You were the Chosen One!</div>
    </div>
    <div className="chat chat-end text-white">
      <div className="chat-image avatar skeleton">
        <div className="w-10 rounded-full  skeleton"></div>
      </div>
      <div className="chat-header flex gap-3 skeleton">
        <p className="skeleton">Anakin</p>
      </div>
      <div className="chat-bubble  skeleton">I hate you!</div>
    </div>
  </>
  )
}
