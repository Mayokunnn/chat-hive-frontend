import ReactDOM from 'react-dom';
import { ReactNode} from "react";

interface Props {
  children: ReactNode;
  name: string;
}

export default function Modal({ children, name }: Props) {
  return ReactDOM.createPortal(
    <dialog id={name} className="modal">
      {children}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>,
    document.getElementById("root")
  );
}
