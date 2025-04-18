"use client";
import {signIn} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {FaGoogle} from "react-icons/fa";

export default function SignUpForm({
 searchParams,
}: {
 searchParams?: {callbackUrl?: string};
}) {
 const {push} = useRouter();
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);

 const callbackUrl = searchParams?.callbackUrl || "/";

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
  <div className="bg-white/50 backdrop-blur-lg max-w-sm w-full p-5 flex flex-col gap-4 justify-center items-center rounded-[8px] shadow-2xl ">
   <h1 className="text-2xl font-semibold text-black">Register</h1>
   <form
    onSubmit={(e) => handleSubmit(e)}
    className="w-full flex flex-col items-center justify-center gap-4">
    <input
     placeholder="Full Name"
     required
     type="text"
     name="fullname"
     id="fullname"
     className="w-full border border-gray-400 text-gray-400 focus:ring focus:ring-blue-400 focus:text-black focus:outline-none p-2 rounded-[8px]"
    />
    <input
     placeholder="Email"
     required
     type="email"
     name="email"
     id="email"
     className="w-full border border-gray-400 text-gray-400 focus:ring focus:ring-blue-400 focus:text-black focus:outline-none p-2 rounded-[8px]"
    />
    <input
     placeholder="Phone Number"
     required
     type="text"
     name="phone"
     id="phone"
     className="w-full border border-gray-400 text-gray-400 focus:ring focus:ring-blue-400 focus:text-black focus:outline-none p-2 rounded-[8px]"
    />

    <input
     placeholder="Password"
     required
     type="password"
     name="password"
     id="password"
     className="w-full border border-gray-400 text-gray-400 focus:ring focus:ring-blue-400 focus:text-black focus:outline-none p-2 rounded-[8px]"
    />

    <button
     type="submit"
     className="w-full bg-[#337367] p-2 rounded text-white cursor-pointer hover:bg-[#395c55]">
     {isLoading ? "Loading..." : "Register"}
    </button>
   </form>
   <div className="flex gap-2 text-[14px]">
    <h1 className="text-gray-400">Already have an account?</h1>
    <Link href="/sign-in">
     <h1 className="text-blue-300 hover:underline">Login</h1>
    </Link>
   </div>
  </div>
 );
}
