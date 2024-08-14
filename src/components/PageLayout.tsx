import { Outlet } from "react-router-dom";

export default function PageLayout() {

  return (
    <div className="h-screen w-screen bg-slate-50 ">
      <Outlet />
    </div>
  );
}
