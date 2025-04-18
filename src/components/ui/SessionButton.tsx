// components/SessionButton.tsx
"use client";
import {signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useState} from "react";
import {CiLogout} from "react-icons/ci";

const SessionButton = () => {
 const [isOpen, setIsOpen] = useState(false);
 const {data: session, status}: {data: any; status: string} = useSession();

 const toggleOpen = () => {
  setIsOpen(!isOpen);
 };

 const getDashboardLink = () => {
  if (session?.user?.role === "admin") return "/admin/dashboard";
  if (session?.user?.role === "member") return "/member/dashboard";
  return "#";
 };

 return (
  <div>
   {status === "authenticated" ? (
    <div className="flex">
     <button
      onClick={toggleOpen}
      className="cursor-pointer">
      {session?.user?.fullname}
     </button>
     {isOpen && (
      <div className="absolute bg-white shadow-lg mt-8 text-black w-48 right-10">
       <ul className="rounded-[8px]">
        <li className="px-4 py-2 hover:bg-gray-200">Item A</li>
        <li className="px-4 py-2 hover:bg-gray-200">
         <Link href={getDashboardLink()}>Dashboard</Link>
        </li>
        <button
         onClick={() => signOut()}
         className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-200">
         Sign Out
         <CiLogout />
        </button>
       </ul>
      </div>
     )}
    </div>
   ) : (
    <button
     className="cursor-pointer"
     onClick={() => signIn()}>
     Sign In
    </button>
   )}
  </div>
 );
};

export default SessionButton;
