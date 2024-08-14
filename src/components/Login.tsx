import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import FormButton from "./FormButton";
// import SignUpOption from "./SignUpOption";
import Divider from "./Divider";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "../services/Auth/useLogin";

// Define the form values type
interface IFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const { mutate: loginUser, isPending } = useLogin();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    loginUser(data);
  };

  useEffect(() => {
    document.title = "Login | Chat Hive";
  }, []);

  return (
    <div className="w-full bg-white flex flex-col items-center justify-center px-8 gap-3">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl text-accent font-semibold">
          Login to your Account
        </h1>
        <h2 className="text-lg text-accent font-medium">
          See what is going on with your friends
        </h2>
      </div>
      {/* <SignUpOption /> */}

      <Divider>Or Sign In with</Divider>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center gap-10"
      >
        <div className="px-16 py-6 w-full flex flex-col items-center gap-y-10">
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            className={`border-2 border-base-300 rounded-md py-4 px-5 items-center outline-none focus:outline-none w-full ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          <div className="border-2 border-base-300 rounded-md p-2 w-full flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              className={`px-3 py-2 outline-none focus:outline-none w-full ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            <div
              onClick={() => setShowPassword(() => !showPassword)}
              className="cursor-pointer"
            >
              {showPassword ? (
                <FaRegEye color="#7F265B" size={20} />
              ) : (
                <FaRegEyeSlash size={20} color="#7F265B" />
              )}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="w-full px-16">
          <FormButton type="submit">
            {isPending ? (
              <span className="loading loading-spinner loading-xs text-base-300"></span>
            ) : (
              "Sign In"
            )}
          </FormButton>
        </div>
      </form>

      <p>
        Don't have an account?{" "}
        <span
          className="font-semibold cursor-pointer text-lg text-secondary"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}
