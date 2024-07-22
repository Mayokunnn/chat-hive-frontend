import { Outlet } from "react-router-dom";
import Main from "../components/Main";

export default function Onboarding() {
  return (
    <Main>
      <div className="grid grid-cols-[60%_40%] h-full bg-onboarding bg-cover rounded-xl">
        <Outlet />
        <div className="w-full h-full"></div>
      </div>
    </Main>
  );
}
