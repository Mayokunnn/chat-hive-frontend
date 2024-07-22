import { useRef, useState } from "react";
import { HiPlus } from "react-icons/hi2";

const FileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];

      // Check file size (30MB limit)
      const maxSizeInMB = 30;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        setError(`File size exceeds ${maxSizeInMB}MB limit.`);
        setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
        return;
      }

      // Check file type
      const allowedTypes = ['image/*', 'video/*', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];
      if (!allowedTypes.includes(file.type) && !allowedTypes.some(type => file.name.endsWith(type))) {
        setError('Invalid file type.');
        setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
        return;
      }

      setError(null);
      // Handle the file upload logic here
    }
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
        accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {error && <div className="toast toast-top toast-end">
         <p className=" alert alert-error">{error}</p>
        {/* Display error message */}
      </div>}
    </div>
  );
};

export default FileUpload;
