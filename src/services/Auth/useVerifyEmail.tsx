// src/hooks/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const verifyEmail = async (data: { otp: string; email: string }) => {
  const { data: verifyData } = await axiosInstance.post("/verify/email", data); // Changed endpoint to '/register'
  return verifyData;
};

export const useVerifyEmail = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      const responseData = data; // Accessing the data using key 0
      console.log(responseData);
      localStorage.removeItem('otpExpiration');
      toast.success(data.message);
      navigate("/");
    },
    onError: (data: AxiosError) => {
        console.log(data);
        const errorData: Error = data.response?.data;
        toast.error(errorData.message);
    },
  });
};
