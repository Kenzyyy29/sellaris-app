"use client";
import {useState} from "react";
import Link from "next/link";

export default function SignUpStep1({onNext}: {onNext: (data: any) => void}) {
 const [formData, setFormData] = useState({
  fullname: "",
  email: "",
  phone: "",
  password: "",
 });
 const [error, setError] = useState("");
 const [passwordError, setPasswordError] = useState("");

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  setFormData((prev) => ({...prev, [name]: value}));

  // Validasi password khusus
  if (name === "password") {
   validatePassword(value);
  }
 };

 const validatePassword = (password: string) => {
  if (password.length < 8) {
   setPasswordError("Password harus minimal 8 karakter");
   return false;
  }
  if (!/[0-9]/.test(password)) {
   setPasswordError("Password harus mengandung angka");
   return false;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
   setPasswordError("Password harus mengandung simbol");
   return false;
  }
  setPasswordError("");
  return true;
 };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!validatePassword(formData.password)) {
   return;
  }

  onNext(formData);
 };

 return (
  <div className="bg-white/40 backdrop-blur-lg max-w-sm w-full p-5 flex flex-col gap-4 justify-center items-center rounded-[8px] shadow-2xl">
   <h1 className="text-2xl font-bold text-black italic">Register</h1>
   <form
    onSubmit={handleSubmit}
    className="w-full flex flex-col items-center justify-center gap-4">
    <input
     placeholder="Full Name"
     required
     type="text"
     name="fullname"
     value={formData.fullname}
     onChange={handleChange}
     className="w-full border border-gray-400 text-gray-400 focus:ring focus:ring-blue-400 focus:text-black focus:outline-none p-2 rounded-[8px] "
    />
    <input
     placeholder="Email"
     required
     type="email"
     name="email"
     value={formData.email}
     onChange={handleChange}
     className="w-full border border-gray-400 text-gray-400 focus:ring focus:ring-blue-400 focus:text-black focus:outline-none p-2 rounded-[8px]"
    />
    <input
     placeholder="Phone Number"
     required
     type="tel"
     name="phone"
     value={formData.phone}
     onChange={handleChange}
     className="w-full border border-gray-400 text-gray-400 focus:ring focus:ring-blue-400 focus:text-black focus:outline-none p-2 rounded-[8px]"
    />
    <input
     placeholder="Password"
     required
     type="password"
     name="password"
     value={formData.password}
     onChange={handleChange}
     className="w-full border border-gray-400 text-gray-400 focus:ring focus:ring-blue-400 focus:text-black focus:outline-none p-2 rounded-[8px]"
    />
    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

    <button
     type="submit"
     className="w-full bg-[#337367] p-2 rounded text-white cursor-pointer hover:bg-[#395c55]">
     Next Step
    </button>
   </form>
   <div className="flex gap-2 text-[14px]">
    <h1 className="text-gray-400">Already have an account?</h1>
    <Link href="/sign-in">
     <h1 className="text-blue-300 hover:underline">Login</h1>
    </Link>
   </div>
   {error && <p className="text-red-500">{error}</p>}
  </div>
 );
}
