"use client";
import {signIn} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function SignInForm() {
 const {push} = useRouter();
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);

 const handleLogin = async (e: any) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  try {
   const res = await signIn("credentials", {
    email: e.target.email.value,
    password: e.target.password.value,
    redirect: false,
    callbackUrl: "/",
   });
   if (!res?.error) {
    e.target.reset();
    setIsLoading(false);
    push("/");
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
  <div className="bg-white/20 backdrop-blur-lg max-w-sm w-full p-5 flex flex-col gap-4 justify-center items-center rounded-[8px] shadow-2xl ">
   <h1 className="text-2xl font-semibold text-white">Sign In</h1>
   <form
    onSubmit={(e) => handleLogin(e)}
    className="w-full flex flex-col items-center justify-center gap-4">
    <div className="flex flex-col gap-2 w-full">
     <label
      htmlFor="email"
      className="text-white">
      Email
     </label>
     <input
      type="email"
      name="email"
      id="email"
      className="w-full border border-white text-white focus:outline-none p-2 rounded-[8px]"
     />
    </div>
    <div className="flex flex-col gap-2 w-full">
     <label
      htmlFor="password"
      className="text-white ">
      Password
     </label>
     <input
      type="password"
      name="password"
      id="password"
      className="w-full border border-white text-white focus:outline-none p-2 rounded-[8px]"
     />
    </div>
    {error && <p className="text-red-500">{error}</p>}
    <button
     type="submit"
     className="w-full bg-slate-800 p-2 rounded text-white cursor-pointer hover:bg-slate-700">
     {isLoading ? "Loading..." : "Sign In"}
    </button>
    <div className="flex gap-2 text-[14px]">
     <h1 className="text-white">Doesn't have an account?</h1>
     <Link href="/sign-up">
      <h1 className="text-blue-300 hover:underline">Create Account</h1>
     </Link>
    </div>
   </form>
  </div>
 );
}
