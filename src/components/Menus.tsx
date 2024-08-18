import {
  createContext,
  ReactNode,
  useContext,
  useState,
  MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface MenuContextProps {
  openId: string;
  close: () => void;
  open: (id: string) => void;
  position: { x: number; y: number } | null;
  setPosition: (position: { x: number; y: number }) => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

interface MenusProps {
  children: ReactNode;
}

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<string>("");
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const close = () => setOpenId("");
  const open = (id: string) => setOpenId(id);

  return (
    <MenuContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

interface MenuProps {
  children: ReactNode;
}

function Menu({ children }: MenuProps) {
  return <div className="flex items-center">{children}</div>;
}

interface ToggleProps {
  id: string;
}

function Toggle({ id }: ToggleProps) {
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    throw new Error("Toggle must be used within a Menu");
  }
  const { openId, close, open, setPosition } = menuContext;

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <div onClick={handleClick}>
      <HiEllipsisVertical />
    </div>
  );
}

interface ListProps {
  id: string;
  children: ReactNode;
}

function List({ id, children }: ListProps) {
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    throw new Error("List must be used within a Menu");
  }
  const { openId, position, close } = menuContext;
  const ref = useOutsideClick(close);

  if (openId !== id) return null;

  return createPortal(
    <ul
      style={{ position: "absolute", left: position?.x, top: position?.y }}
      ref={ref}
      className=""
    >
      {children}
    </ul>,
    document.body
  );
}

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
}

function Button({ children, icon, onClick }: ButtonProps) {
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    throw new Error("Button must be used within a Menu");
  }
  const { close } = menuContext;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
