import { useConversation } from "../context/ConversationContext";
import { useReplyMessage } from "../context/ReplyMessageContext";
import { useFetchMessages } from "../services/Messages/useFetchMessages";

interface FileModalProps {
  file: File;
  handleCloseModal: () => void;
  handleChangeFile: () => void;
}

const UploadForm: React.FC<FileModalProps> = ({
  file,
  handleCloseModal,
  handleChangeFile,
}) => {
  const { replyMessage } = useReplyMessage();
  const { conversation } = useConversation();
  const { sendMessageMutation } = useFetchMessages(conversation?.id + "");
  const { mutate: sendMessage, isSuccess, isPending } = sendMessageMutation;
  const imageFile = file;
  const handleSend = () => {
    const formData = new FormData();

    formData.append("type", "image");
    formData.append("file", imageFile);
    formData.append("senderId", localStorage.getItem("userId") || "");
    formData.append("conversationId", conversation?.id + "");
    formData.append("replyTo", replyMessage ? replyMessage.id : "");

    sendMessage(formData);
    isSuccess && handleCloseModal();
  };

  return (
    <dialog id="file" className="modal" open>
      <div className="modal-box space-y-6">
        <h3 className="font-bold text-lg">Upload File</h3>
        <div className="img mx-auto flex items-center justify-center">
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="Selected"
              className="max-w-full h-auto rounded-md"
            />
          )}
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="btn btn-accent" onClick={handleChangeFile}>
            Change File
          </button>
          <button
            onClick={handleSend}
            className="btn bg-secondary text-secondary-content"
          >
            {isPending ? (
              <span className="loading loading-spinner text-secondary-content"></span>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UploadForm;
