import ReactDOM from "react-dom";
import { useModalContext } from "../context/ModalContext";

export default function Modal() {
  const { modalAction, type, modalMessage } = useModalContext();

  const handleClick = () => {
    if (modalAction) {
      modalAction();
    }    
    document.getElementById("confirm").close();
  };

  return ReactDOM.createPortal(
    <dialog id="confirm" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Warning!</h3>
        <p className="py-4">{modalMessage}</p>
        <div className="modal-action">
          <button
            className="btn btn-ghost"
            onClick={() => document.getElementById("confirm").close()}
          >
            Cancel
          </button>
          <button className="btn btn-error capitalize" onClick={handleClick}>
            {type}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>,
    document.getElementById?.("root") // This is where the portal will render
  );
}
