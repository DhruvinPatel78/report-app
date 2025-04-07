"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "@/components/loading";
export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) return <Loading />;
  return (
    !isLoading && (
      <div className="h-screen flex w-full justify-center items-center flex-col p-4">
        <div
          className={"flex flex-col max-w-[400px] w-full gap-4 items-center"}
        >
          <Image
            className="dark:invert"
            src="/Logo.png"
            alt="Next.js logo"
            width={20}
            height={28}
            priority
          />
          <div className={"flex flex-col gap-2 items-center"}>
            <span className={"text-[#09090B] text-3xl font-bold"}>Sign in</span>
            <span className={"text-[#71717A] text-center"}>
              Log in to unlock tailored content and stay connected with your
              community.
            </span>
          </div>
          <Input type="email" placeholder="Email" className={"w-full"} />
          <Input type="password" placeholder="Password" className={"w-full"} />
          <Button
            className={"w-full cursor-pointer"}
            onClick={() => {
              setIsLoading(true);
              setTimeout(async () => {
                await setIsLoading(false);
                await router.push("/dashboard");
              }, 3000);
            }}
          >
            Sign in
          </Button>
          <span className={"text-[#71717A] underline"}>Forgot password?</span>
          <span className={"text-[#71717A]"}>
            Don’t have an account?
            <span className={"text-[#18181B] ml-1 underline"}>Sign up</span>
          </span>
        </div>
      </div>
    )
  );
}
