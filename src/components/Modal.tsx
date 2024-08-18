import React, {
  cloneElement,
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface ModalContextType {
  openName: string;
  close: () => void;
  open: Dispatch<SetStateAction<string>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenProps {
  children: React.ReactElement;
  opens: string;
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Open must be used within a Modal");

  const { open } = context;

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

interface WindowProps {
  children: React.ReactElement;
  name: string;
}

function Window({ children, name }: WindowProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Window must be used within a Modal");

  const { openName, close } = context;
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-10 flex items-center justify-center transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in">
      <div
        ref={ref}
        className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl p-6"
      >
        <button onClick={close} className="absolute z-10 top-2 right-2">
          <HiXMark size={25} />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
