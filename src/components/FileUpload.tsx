import { useRef, useState } from "react";
import { HiPlus } from "react-icons/hi2";
import UploadForm from "./UploadForm"; // Ensure the correct path
import useModal from "../hooks/useModal";
// import Modal from "./Modal";

const FileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { handleCloseModal: closeModal, handleShowModal } = useModal();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];

      // Check file size (30MB limit)
      const maxSizeInMB = 10;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        setError(`File size exceeds ${maxSizeInMB}MB limit.`);
        setTimeout(() => setError(null), 2000); // Clear error after 3 seconds
        return;
      }

      setError(null);
      setSelectedFile(file);
      handleShowModal("file");
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    closeModal("file");
    setSelectedFile(null);
  };

  return (
    <div>
      <HiPlus
        size={25}
        color="white"
        className="hover:opacity-80 cursor-pointer"
        onClick={handleIconClick}
      />
      <input
        type="file"
        name="file"
        className="hidden"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {error && (
        <div className="toast toast-top toast-end">
          <p className="alert alert-error">{error}</p>
        </div>
      )}
      {isModalOpen && (
        // <Modal name="file">
          <UploadForm
            file={selectedFile}
            handleCloseModal={handleCloseModal}
            handleChangeFile={handleIconClick}

          />
        // </Modal>
      )}
    </div>
  );
};

export default FileUpload;
