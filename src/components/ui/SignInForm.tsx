"use client";
import {signIn} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {FaGoogle} from "react-icons/fa";

export default function SignInForm({
 searchParams,
}: {
 searchParams?: {callbackUrl?: string};
}) {
 const {push} = useRouter();
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);

 const callbackUrl = searchParams?.callbackUrl || "/";

 const handleLogin = async (e: any) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  try {
   const res = await signIn("credentials", {
    email: e.target.email.value,
    password: e.target.password.value,
    redirect: false,
    callbackUrl,
   });
   if (!res?.error) {
    e.target.reset();
    setIsLoading(false);
    push(callbackUrl);
   } else {
    setError(res.error);
    if (res.status === 401) {
     setError("Invalid email or password");
    }
   }
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <div className="bg-white/40 backdrop-blur-lg max-w-sm w-full p-5 flex flex-col gap-4 justify-center items-center rounded-[8px] shadow-2xl ">
   <h1 className="text-2xl font-bold text-black italic">SELLARIS APP</h1>
   <form
    onSubmit={(e) => handleLogin(e)}
    className="w-full flex flex-col items-center justify-center gap-4">
    <input
     placeholder="Email"
     type="email"
     name="email"
     id="email"
     className="w-full border border-gray-400 text-gray-400 focus:ring focus:ring-blue-400 focus:text-black focus:outline-none p-2 rounded-[8px]"
    />
    <input
     placeholder="Password"
     type="password"
     name="password"
     id="password"
     className="w-full border border-gray-400 text-gray-400 focus:ring focus:ring-blue-400 focus:text-black focus:outline-none p-2 rounded-[8px]"
    />
    {error && <p className="text-red-500">{error}</p>}
    <button
     disabled={isLoading}
     type="submit"
     className="w-full bg-[#337367] p-2 rounded text-white cursor-pointer hover:bg-[#395c55]">
     {isLoading ? "Loading..." : "Login"}
    </button>
   </form>
   <div className="flex gap-2 text-[14px]">
    <h1 className="text-gray-400">Doesn't have an account?</h1>
    <Link href="/sign-up">
     <h1 className="text-blue-300 hover:underline">Create Account</h1>
    </Link>
   </div>
  </div>
 );
}
