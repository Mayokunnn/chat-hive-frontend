import { ReactNode } from "react";

interface Props {
    children : ReactNode
    type?: "submit" | "reset" | "button" | undefined
}

export default function FormButton({children, type}: Props) {
  return (
    <button type={type} className="font-semibold bg-secondary py-2.5 text-white rounded-md w-full">
      {children}
    </button>
  );
}
