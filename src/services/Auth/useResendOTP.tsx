// src/hooks/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const resendOTP = async (data: { email: string }) => {
  const { data: resendData } = await axiosInstance.post("/otp/resend", data); // Changed endpoint to '/register'
  return resendData;
};

export const useResendOTP = () => {
  return useMutation({
    mutationFn: resendOTP,
    onSuccess: (data) => {
      const responseData = data.data; // Accessing the data using key 0
      localStorage.setItem(
        "otpExpiration",
       responseData.otpExpiration
      );
      console.log(responseData);
      toast.success(data.message);
    },
    onError: (data: AxiosError) => {
      console.log(data);
      const errorData: Error = data.response?.data;
      toast.error(errorData.message);
    },
  });
};
