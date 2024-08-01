import { ReactNode } from "react";

interface Props {
    children : ReactNode
    type?: "submit" | "reset" | "button" | undefined
}

export default function FormButton({children, type}: Props) {
  return (
    <button type={type} className="border-2 border-base-300 py-2.5 text-gray-500 hover:bg-gray-500 hover:border-transparent hover:text-white rounded-full w-full">
      {children}
    </button>
  );
}
