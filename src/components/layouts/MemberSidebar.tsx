"use client";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {FaCaretDown} from "react-icons/fa6";

const Library = {
 title: "Library",
 items: [
  {name: "Products", path: "/member/library/products"},
  {name: "Bundle Package", path: "/member/library/bundle-package"},
  {
   name: "Promo",
   path: "/library/promo",
  },
  {
   name: "Discount",
   path: "/library/discount",
  },
  {
   name: "Sales Type",
   path: "/library/sales-type",
  },
 ],
};

const Inventory = {
 title: "Inventory",
 items: [
  {name: "Ingredients Library", path: "/member/library/ingredients"},
  {
   name: "Ingredient Categories",
   path: "/inventory/ingredient-categories",
  },
  {
   name: "Recipes",
   path: "/inventory/recipes",
  },
  {
   name: "Suppliers",
   path: "/inventory/suppliers",
  },
 ],
};

export default function MemberSidebar() {
 const [openDropdown, setOpenDropdown] = useState<string | null>(null);
 const [closingDropdown, setClosingDropdown] = useState<string | null>(null);

 const toggleDropdown = (dropdown: string) => {
  setOpenDropdown(openDropdown === dropdown ? null : dropdown);
 };

 const isActive = (itemPath: string) => {
  return pathname === itemPath;
 };

 const shouldAutoOpen = (items: {path: string}[]) => {
  return items.some((item) => pathname === item.path);
 };

 const pathname = usePathname();
 const {data: session}: {data: any} = useSession();
 return (
  <div className="fixed left-0 top-0 h-full max-w-[250px] w-full bg-white/40 p-5 flex flex-col justify-between items-center rounded-[8px] shadow-sm ">
   <ul className="flex flex-col w-full items-center">
    <Link href="/">
     <h1 className="text-3xl italic font-bold text-primary">Sellaris</h1>
    </Link>
    <p className="truncate text-lg font-semibold text-center max-w-[200px] underline mt-5">
     Hi, {session?.user?.fullname}
    </p>

    {/* Library Dropdown */}
    <div className="w-full">
     <div
      className={`hover:bg-primary hover:text-white font-medium w-full cursor-pointer p-2 mt-2 ${
       Library.items.some((item) => isActive(item.path))
        ? "bg-primary text-white"
        : ""
      }`}
      onClick={() => toggleDropdown("item1")}>
      <div className="flex justify-between items-center w-full">
       {Library.title}
       <FaCaretDown
        className={`transition-transform duration-200 ${
         openDropdown === "item1" ? "rotate-180" : ""
        }`}
       />
      </div>
     </div>

     <div
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
       openDropdown === "item1" ? "max-h-96" : "max-h-0"
      }`}>
      <ul className="bg-[#f4f4f4] text-black w-full">
       {Library.items.map((item, index) => (
        <li key={index}>
         <Link
          href={item.path}
          className={`block lg:p-2 lg:px-5 2xl:p-3 2xl:px-6 ${
           isActive(item.path)
            ? "bg-[#395c55] text-white"
            : "hover:bg-[#cdcccc]"
          }`}>
          {item.name}
         </Link>
        </li>
       ))}
      </ul>
     </div>
    </div>

    {/* Inventory Dropdown */}
    <div className="w-full">
     <div
      className={`hover:bg-primary hover:text-white font-medium w-full cursor-pointer p-2 mt-2 ${
       Inventory.items.some((item) => isActive(item.path))
        ? "bg-primary text-white"
        : ""
      }`}
      onClick={() => toggleDropdown("item2")}>
      <div className="flex justify-between items-center w-full">
       {Inventory.title}
       <FaCaretDown
        className={`transition-transform duration-200 ${
         openDropdown === "item2" ? "rotate-180" : ""
        }`}
       />
      </div>
     </div>

     <div
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
       openDropdown === "item2" ? "max-h-96" : "max-h-0"
      }`}>
      <ul className="bg-[#f4f4f4] text-black w-full">
       {Inventory.items.map((item, index) => (
        <li key={index}>
         <Link
          href={item.path}
          className={`block lg:p-2 lg:px-5 2xl:p-3 2xl:px-6 ${
           isActive(item.path)
            ? "bg-[#395c55] text-white"
            : "hover:bg-[#cdcccc]"
          }`}>
          {item.name}
         </Link>
        </li>
       ))}
      </ul>
     </div>
    </div>
   </ul>

   <button
    onClick={() => signOut()}
    className="bg-primary hover:bg-[#395c55] text-tertiary w-full py-2 rounded-[8px] cursor-pointer">
    Sign Out
   </button>
  </div>
 );
}
