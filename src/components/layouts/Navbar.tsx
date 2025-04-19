import Link from "next/link";
import React from "react";
import SessionButton from "../ui/SessionButton";

const Navbar = () => {
 return (
  <header className=" w-full">
   <nav className="fixed p-5 px-10 top-0 left-0 z-10 w-full flex justify-between items-center bg-primary text-tertiary">
    <ul className="flex justify-center w-full max-w-[200px]">
     <Link href="/">
      <h1 className="text-2xl font-bold italic font-raleway">SELLARIS</h1>
     </Link>
    </ul>
    <ul className="flex gap-5 items-center w-full justify-center">
     <li>
      <Link href="/about-us">About</Link>
     </li>
     <li>
      <Link href="/products">Product</Link>
     </li>
    </ul>
    <ul className="max-w-[200px] w-full flex justify-center">
     <SessionButton />
    </ul>
   </nav>
  </header>
 );
};

export default Navbar;
