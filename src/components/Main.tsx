import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Main({ children }: Props) {
  return (
    <div className="w-[90vh] h-[90vh] max-w-[90%] max-h-[90%] lg:w-[80%] lg:max-w-[80%] ">
      {children}
    </div>
  );
}
