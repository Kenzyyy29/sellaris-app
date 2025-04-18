// components/SessionButton.tsx
"use client";
import {signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useState} from "react";
import {CiLogout} from "react-icons/ci";
import {RxDashboard} from "react-icons/rx";

const SessionButton = () => {
 const [isOpen, setIsOpen] = useState(false);
 const {data: session, status}: {data: any; status: string} = useSession();

 const toggleOpen = () => {
  setIsOpen(!isOpen);
 };

 const getDashboardLink = () => {
  if (session?.user?.role === "admin") return "/admin/dashboard";
  if (session?.user?.role === "member") return "/member/dashboard";
  return "/";
 };

 return (
  <div>
   {status === "authenticated" ? (
    <div className="flex">
     <button
      onClick={toggleOpen}
      className="cursor-pointer p-2 border truncate bg-tertiary rounded-[8px] text-primary">
      {session?.user?.fullname}
     </button>
     {isOpen && (
      <div className="absolute bg-tertiary shadow-lg mt-11 rounded-[8px] text-black w-48 right-10">
       <ul>
        <button className="px-4 py-2 hover:bg-gray-200 w-full rounded-[8px] flex items-center justify-between">
         <Link
          href={getDashboardLink()}
          className="rounded-[8px] w-full flex items-center justify-between">
          Dashboard
          <RxDashboard />
         </Link>
        </button>
        <button
         onClick={() => signOut()}
         className="w-full flex items-center cursor-pointer rounded-[8px] justify-between px-4 py-2 hover:bg-gray-200">
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
