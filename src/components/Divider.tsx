import { ReactNode } from "react";

interface Props {
    children : ReactNode
}

export default function Divider({children}: Props) {
  return (
    <div className="divider px-24 font-medium h-2 text-accent">{children}</div>
  )
}
