import ReactDOM from "react-dom";

interface FileModalProps {
  file: File | null;
  handleCloseModal: () => void;
  handleChangeFile: () => void;
}

const UploadModal: React.FC<FileModalProps> = ({ file, handleCloseModal, handleChangeFile }) => {
  return ReactDOM.createPortal(
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
          <button className="btn btn-accent" onClick={handleChangeFile}>Change File</button>
          <button className="btn btn-info">Send</button>
        </div>
      </div>
    </dialog>,
    document.getElementById("root") // This is where the portal will render
  );
};

export default UploadModal;
