"use client";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaCreditCard, FaUser} from "react-icons/fa";
import {FaCartShopping} from "react-icons/fa6";
import {GoGear} from "react-icons/go";
import {MdDashboard} from "react-icons/md";
import {RiCustomerService2Fill} from "react-icons/ri";
import {TbReport} from "react-icons/tb";

const links = [
 {name: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard />},
 {
  name: "Products",
  path: "/admin/products",
  icon: <FaCartShopping />,
 },
 {name: "Reports", path: "/admin/reports", icon: <TbReport />},
 {
  name: "Payment Methods",
  path: "/admin/payment-methods",
  icon: <FaCreditCard />,
 },
 {name: "Clients", path: "/admin/clients", icon: <FaUser />},
 {
  name: "Services",
  path: "/admin/services",
  icon: <RiCustomerService2Fill />,
 },
 {name: "Settings", path: "/admin/settings", icon: <GoGear />},
];

export default function AdminSidebar() {
 const pathname = usePathname();
 const {data: session, status}: {data: any; status: string} = useSession();
 return (
  <div className="fixed left-0 top-0 h-full max-w-[250px] w-full bg-white/40 p-5 flex flex-col justify-between items-center rounded-[8px] shadow-sm ">
   <ul className="flex flex-col w-full items-center">
    <Link href="/">
     <h1 className="text-3xl italic font-bold text-primary">Sellaris</h1>
    </Link>
    <ul className="flex flex-col gap-2 w-full mt-14">
     {links.map((link, index) => (
      <Link
       href={link.path}
       key={index}
       className={`flex items-center gap-4 p-2 hover:bg-primary hover:text-tertiary rounded-[8px] w-full transition-all duration-500 ${
        link.path === pathname && "bg-primary text-tertiary"
       }`}>
       <li className="text-xl">{link.icon}</li>
       <p>{link.name}</p>
      </Link>
     ))}
    </ul>
   </ul>
   <button
    onClick={() => signOut()}
    className="bg-[#337367] text-tertiary w-full py-2 rounded-[8px] cursor-pointer">
    Sign Out
   </button>
  </div>
 );
}
