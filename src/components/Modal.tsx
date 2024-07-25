import ReactDOM from "react-dom";

export default function Modal() {
  return ReactDOM.createPortal(
    <dialog id="confirm" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Warning!</h3>
        <p className="py-4">Are you sure you want to delete this conversation?</p>
      <div className="modal-action">
        <button className="btn btn-ghost"  onClick={() => document.getElementById('confirm').close()} >Cancel</button>
        <button className="btn btn-error" >Delete</button>
      </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>,
    document.getElementById?.("root")// This is where the portal will render
  );
}
