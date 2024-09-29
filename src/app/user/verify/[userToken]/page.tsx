"use client";

import { api } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";

const Verify = ({ params }: { params: { userToken: string } }) => {
  const router = useRouter();
  const searchParam = useSearchParams();

  const [isLoading, startTransition] = useTransition();
  if (!params || !searchParam.get("uid")) {
    router.replace("/");
  }

  async function VerifyUser(token: string) {
    startTransition(async () => {
      const uid = searchParam.get("uid");
      try {
        const response = await api.put("/user/verify/" + uid, {
          token: token,
        });
        if (response.status === 200) {
          toast.success("Email has been verified successfully!");
          router.replace("/auth/login");
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  useEffect(() => {
    VerifyUser(params.userToken);
  }, []);

  return isLoading ? (
    <div className="h-screen w-full flex justify-center overflow-y-hidden items-center text-pretty text-center">
      We are verifying your Email.
    </div>
  ) : (
    <div className="h-screen w-full flex flex-col justify-center overflow-y-hidden items-center text-pretty text-center">
      <h2>Your Email has been verified Successfully.</h2>
      <p>Redirecting you to Login Page.</p>
    </div>
  );
};

export default Verify;
