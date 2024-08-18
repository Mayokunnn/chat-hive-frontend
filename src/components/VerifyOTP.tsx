import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { differenceInSeconds } from "date-fns";
import FormButton from "./FormButton";
import OtpInput from "./OtpInput";
import { useVerifyEmail } from "../services/Auth/useVerifyEmail";
import { useResendOTP } from "../services/Auth/useResendOTP";

interface VerifyOTPFormValues {
  otp: string;
}

export default function VerifyOTP() {
  const { handleSubmit, setValue } = useForm<VerifyOTPFormValues>();
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const otp = localStorage.getItem("otpExpiration");
  const otpExpirationTime = useMemo(() => new Date(otp || ""), [otp]); // replace with the actual expiration time
  const { mutate, isPending } = useVerifyEmail();
  const { mutate: resendOTP } = useResendOTP();

  useEffect(() => {
    const updateRemainingTime = () => {
      const secondsRemaining = differenceInSeconds(
        otpExpirationTime,
        new Date()
      );
      setTimeRemaining(secondsRemaining > 0 ? secondsRemaining : 0);
    };

    const intervalId = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(intervalId);
  }, [otpExpirationTime]);

  const onSubmit = (data: VerifyOTPFormValues) => {
    if (timeRemaining > 0) {
      const newData = {
        otp: data.otp,
        email: localStorage.getItem("userEmail") || "",
      };
      mutate(newData);
    } else {
      toast.error("OTP has expired. Please request a new one.");
    }
  };

  const onResend = () => {
    const data = {
      email: localStorage.getItem("userEmail") || "",
    };

    resendOTP(data);
  };

  return (
    <div className="flex w-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-6 flex flex-col items-center px-12"
      >
        <h1 className="text-3xl font-semibold">Verify your OTP</h1>
        <div>
          <OtpInput length={6} onChange={(newOtp) => setValue("otp", newOtp)} />
          <div className="text-lg  flex justify-between w-full">
            <p className="text-secondary cursor-pointer hover:font-medium" onClick={onResend}>Resend OTP?</p>
            <span>
              {Math.floor(timeRemaining / 60)}:
              {("0" + (timeRemaining % 60)).slice(-2)}
            </span>
          </div>
        </div>
        <FormButton type="submit">
          {isPending ? (
            <span className="loading loading-spinner loading-xs text-base-300"></span>
          ) : (
            "Verify"
          )}
        </FormButton>
      </form>
    </div>
  );
}
