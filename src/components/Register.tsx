import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import FormButton from "./FormButton";
import Divider from "./Divider";
import { useRegister } from "../services/Auth/useRegister";

// Define the form values type
interface IFormInputs {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const { mutate: registerUser, isPending } = useRegister();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    registerUser(data);
  };
  useEffect(() => {
    document.title = "Sign Up | Chat Hive";
  }, []);

  return (
    <div className="w-full h-full bg-white flex flex-col justify-center items-center px-8 gap-2">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl text-accent font-semibold">
          Create your account
        </h1>
        <h2 className="text-lg text-accent font-medium">
          Some of your friends are waiting for you
        </h2>
      </div>
      <Divider>Or Sign Up with</Divider>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-8 px-16 w-full flex flex-col items-center gap-10"
      >
        <div className="w-full">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Full Name is required" })}
            className={`border-2 border-base-300 px-5 py-4 rounded-md outline-none focus:outline-none w-full ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="w-full">
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
            className={`border-2 border-base-300 px-5 py-4 rounded-md outline-none focus:outline-none w-full ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="border-2 p-2 rounded-md border-base-300 w-full flex items-center">
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
            onClick={() => setShowPassword(!showPassword)}
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

        <div className="w-full" aria-disabled={isPending}>
          <FormButton type="submit">
            {isPending ? (
              <span className="loading loading-spinner loading-xs text-base-300"></span>
            ) : (
              "Sign Up"
            )}
          </FormButton>
        </div>
      </form>
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
