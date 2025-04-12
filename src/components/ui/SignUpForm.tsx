"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {FaGoogle} from "react-icons/fa";

export default function SignUpForm() {
 const {push} = useRouter();
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);

 const handleSubmit = async (e: any) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  const res = await fetch("/api/auth/register", {
   method: "POST",
   body: JSON.stringify({
    fullname: e.target.fullname.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    password: e.target.password.value,
   }),
  });
  if (res.status === 200) {
   e.target.reset();
   setIsLoading(false);
   push("/sign-in");
  } else {
   setError("Email sudah terdaftar");
   setIsLoading(false);
  }
 };
 return (
  <div className="bg-white/20 backdrop-blur-lg max-w-sm w-full p-5 flex flex-col gap-4 justify-center items-center rounded-[8px] shadow-2xl ">
   <h1 className="text-2xl font-semibold text-white">Sign Up</h1>
   <form
    onSubmit={(e) => handleSubmit(e)}
    className="w-full flex flex-col items-center justify-center gap-4">
    <div className="flex flex-col gap-2 w-full">
     <label
      htmlFor="fullname"
      className="text-white">
      Name
     </label>
     <input
      type="text"
      name="fullname"
      id="fullname"
      className="w-full border border-white text-white focus:outline-none p-2 rounded-[8px]"
     />
    </div>
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
      htmlFor="phone"
      className="text-white">
      Phone Number
     </label>
     <input
      type="text"
      name="phone"
      id="phone"
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
    <button
     type="submit"
     className="w-full bg-slate-800 p-2 rounded text-white cursor-pointer hover:bg-slate-700">
     {isLoading ? "Loading..." : "Sign In"}
    </button>
   </form>
   <div className="flex gap-2 w-full items-center">
    <hr className="border border-white w-full" />
    <h1 className="text-white">or</h1>
    <hr className="border border-white w-full" />
   </div>
   <button className="p-2 flex justify-center items-center gap-2 rounded text-white cursor-pointer hover:bg-slate-700 bg-slate-800 w-full">
    <FaGoogle />
    Sign in with Google
   </button>
   <div className="flex gap-2 text-[14px]">
    <h1 className="text-white">Already have an account?</h1>
    <Link href="/sign-in">
     <h1 className="text-blue-300 hover:underline">Sign in</h1>
    </Link>
   </div>
  </div>
 );
}
