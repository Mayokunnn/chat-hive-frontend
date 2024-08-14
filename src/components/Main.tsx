import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Main({ children }: Props) {
  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
}
