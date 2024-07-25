import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import FormButton from "./FormButton";
import Divider from "./Divider";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    document.title = "Sign Up | Chat Hive"
  }, [])

  return (
    <div className="w-full rounded-xl rounded-r-[4rem] bg-white flex flex-col items-center pt-16 p-12 gap-6">
      <div className="text-left w-full px-16">
        <h1 className="text-3xl">Create account</h1>
      </div>
      <div className="py-8 px-16 w-full flex flex-col items-center gap-10">
        <input
          type="name"
          placeholder="Full Name"
          className="border-b-2 border-base-300 px-3 py-2 outline-none focus:outline-none w-full"
        />
        <input
          type="email"
          placeholder="Email address"
          className="border-b-2 border-base-300 px-3 py-2 outline-none focus:outline-none w-full"
        />
        <div className="border-b-2 border-base-300 w-full flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="px-3 py-2 outline-none focus:outline-none w-full"
          />
          <div
            onClick={() => setShowPassword(() => !showPassword)}
            className="cursor-pointer"
          >
            {showPassword ? (
              <FaRegEye color="gray" size={20} />
            ) : (
              <FaRegEyeSlash size={20} color="gray" />
            )}
          </div>
        </div>
      </div>

      <div className="w-full px-16">
        <FormButton>Sign Up</FormButton>
      </div>

      <Divider>Or Sign Up with</Divider>


      <p>
        Have an account?{" "}
        <span
          className="font-semibold cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}
