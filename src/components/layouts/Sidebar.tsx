"use client";
import {signOut} from "next-auth/react";
import Link from "next/link";

const Links = [
 {name: "Management", href: "/dashboard/management/user-management"},
];

export default function Sidebar() {
 return (
  <div className="fixed h-screen w-[250px] flex flex-col justify-between p-4 bg-black text-white">
   <div className="">
    <Link href="/">
     <h1 className="text-2xl font-bold text-center">Admin</h1>
    </Link>
    <ul className="mt-10">
     {Links.map((link) => (
      <li
       key={link.href}
       className="flex flex-col gap-5 cursor-pointer bg-white text-black px-4 py-2 rounded-[8px]">
       <Link href={link.href}>
        <button>{link.name}</button>
       </Link>
      </li>
     ))}
    </ul>
   </div>
   <button
    onClick={() => signOut()}
    className="flex flex-col gap-5 hover:bg-white/90 cursor-pointer bg-white text-black px-4 py-2 rounded-[8px]">
    Keluar
   </button>
  </div>
 );
}
