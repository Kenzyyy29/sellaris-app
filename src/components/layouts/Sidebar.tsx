"use client";
import {signOut} from "next-auth/react";
import Link from "next/link";
import {useState} from "react";
import {FaCaretDown} from "react-icons/fa";

const Management = {
 title: "Management",
 items: [
  {name: "User Management", href: "/dashboard/management/user-management"},
 ],
};

const Library = {
 title: "Library",
 items: [
  {name: "Ingredients", href: "/dashboard/ingredients"},
 ],
};


const Products = {
 title: "Product",
 items: [{name: "Product Library", href: "/dashboard/products"}],
};

export default function Sidebar() {
 const [openDropdown, setOpenDropdown] = useState<string | null>(null);

 const toggleDropdown = (dropdown: string) => {
  setOpenDropdown(openDropdown === dropdown ? null : dropdown);
 };
 return (
  <div className="fixed h-screen w-[250px] flex flex-col justify-between p-4 bg-black text-white">
   <div className="flex flex-col gap-10">
    <Link href="/">
     <h1 className="text-2xl font-bold text-center">Admin</h1>
    </Link>

    {/*nav*/}
    <div className="flex flex-col gap-1 ">
     <Link href="/dashboard">
      <h1 className="">Dashboard</h1>
     </Link>
     <ul
      className="hover:bg-primary hover:text-white lg:py-2 2xl:py-3 font-medium"
      onClick={() => toggleDropdown("item1")}>
      <div className="flex justify-between items-center">
       {Management.title}
       <FaCaretDown className="fill-primary" />
      </div>
     </ul>
     {openDropdown === "item1" && (
      <ul className="bg-black text-white">
       {Management.items.map((item, index) => (
        <ul key={index}>
         <Link href={item.href}>
          <li className="lg:p-2 lg:px-5 2xl:p-3 2xl:px-6 cursor-pointer hover:bg-white/20">
           {item.name}
          </li>
         </Link>
        </ul>
       ))}
      </ul>
     )}

     <ul
      className="hover:bg-primary hover:text-white lg:py-2 2xl:py-3 font-medium"
      onClick={() => toggleDropdown("item2")}>
      <div className="flex justify-between items-center">
       {Library.title}
       <FaCaretDown className="fill-primary" />
      </div>
     </ul>
     {openDropdown === "item2" && (
      <ul className="bg-black text-white">
       {Library.items.map((item, index) => (
        <ul key={index}>
         <Link href={item.href}>
          <li className="lg:p-2 lg:px-5 2xl:p-3  2xl:px-6 cursor-pointer hover:bg-white/20">
           {item.name}
          </li>
         </Link>
        </ul>
       ))}
      </ul>
     )}

     <ul
      className="hover:bg-primary hover:text-white lg:py-2 2xl:py-3 font-medium"
      onClick={() => toggleDropdown("item3")}>
      <div className="flex justify-between items-center">
       {Products.title}
       <FaCaretDown className="fill-primary" />
      </div>
     </ul>
     {openDropdown === "item3" && (
      <ul className="bg-black text-white">
       {Products.items.map((item, index) => (
        <ul key={index}>
         <Link href={item.href}>
          <li className="lg:p-2 lg:px-5 2xl:p-3  2xl:px-6 cursor-pointer hover:bg-white/20">
           {item.name}
          </li>
         </Link>
        </ul>
       ))}
      </ul>
     )}
    </div>
   </div>
   <button
    onClick={() => signOut()}
    className="flex flex-col gap-5 hover:bg-white/90 cursor-pointer bg-white text-black px-4 py-2 rounded-[8px]">
    Keluar
   </button>
  </div>
 );
}
