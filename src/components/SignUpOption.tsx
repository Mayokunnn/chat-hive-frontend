import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";

export default function SignUpOption() {
  return (
    <div className="flex gap-8">
        <div className="border border-base-300 rounded-full p-2 cursor-pointer ">
          <FcGoogle size={20} />
        </div>
        <div  className="border border-base-300 rounded-full p-2 cursor-pointer">
          <FaXTwitter size={20} color="black" />
        </div>
      </div>
  )
}
