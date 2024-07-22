import { ReactNode } from "react";

interface Props {
    children : ReactNode
}

export default function FormButton({children}: Props) {
  return (
    <button className="border-2 border-base-300 py-2.5 text-gray-500 hover:bg-gray-500 hover:border-transparent hover:text-white rounded-full w-full">
      {children}
    </button>
  );
}
