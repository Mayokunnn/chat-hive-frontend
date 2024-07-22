import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import FormButton from "./FormButton";
import SignUpOption from "./SignUpOption";
import Divider from "./Divider";

export default function Login() {
    const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Login | Chat Hive"
  }, [])

  return (
    <div className="w-full rounded-xl rounded-r-[4rem] bg-white flex flex-col items-center p-12 gap-4">
      <div className="text-center">
        <h1 className="text-3xl lg:text-4xl">Welcome Back</h1>
        <h2 className="text-lg">Please login to continue</h2>
      </div>
      <div className="py-12 px-16 w-full flex flex-col items-center gap-10">
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
        <FormButton>Login</FormButton>
      </div>

      <Divider>Or Sign Up with</Divider>

      <SignUpOption />

      <p>Don't have an account? <span className="font-semibold cursor-pointer" onClick={()=> navigate('/register')}>Sign Up</span></p>
    </div>
  );
}
