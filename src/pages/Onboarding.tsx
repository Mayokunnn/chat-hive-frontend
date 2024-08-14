import { Outlet } from "react-router-dom";
import Main from "../components/Main";

export default function Onboarding() {
  return (
    <Main>
      <div className="grid grid-cols-[55%_45%] h-screen">
        <div className="w-full h-full bg-primary flex items-center justify-center">
          <div className="max-w-[80%]">
            <img
              src="./bg-onboarding.svg"
              alt="Onboarding Background"
            />
          </div>
        </div>
        <Outlet />
      </div>
    </Main>
  );
}
