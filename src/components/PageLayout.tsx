import { Outlet } from "react-router-dom";
import { useAuth } from "../services/Auth/useAuth";

export default function PageLayout() {
  // const { loading } = useAuth();

  // if (loading) {
  //   <div className="h-screen w-screen flex items-center justify-center bg-white">
  //     <span className="loading loading-dots loading-lg"></span>
  //   </div>
  // }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-main bg-cover">
      <Outlet />
    </div>
  );
}
