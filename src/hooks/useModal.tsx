
  
  export default function useModal() {
    const handleShowModal = (id: string) => {
        const modalElement = document.getElementById(
          id
        ) as HTMLDialogElement | null;
        if (modalElement) {
          modalElement.showModal();
        }
      };
    
    
      const handleCloseModal = (id: string) => {
        const modalElement = document.getElementById(
          id
        ) as HTMLDialogElement | null;
        if (modalElement) {
          modalElement.close();
        }
      };

      return {handleShowModal, handleCloseModal};
    
  }
  