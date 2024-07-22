import { ReactNode } from "react";

interface Props {
    children : ReactNode
}

export default function Divider({children}: Props) {
  return (
    <div className="divider px-16 text-gray-500">{children}</div>
  )
}
