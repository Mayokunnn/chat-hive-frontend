import { Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-main bg-cover">
      <Outlet />
    </div>
  );
}
