import MemberSidebar from "@/components/layouts/MemberSidebar";
import {Metadata} from "next";

export const metadata: Metadata = {
 title: "Sellaris Admin Dashboard",
 description: "Sellaris Admin Dashboard",
};

export default function MemberLayout({children}: {children: React.ReactNode}) {
 return (
  <div className="flex">
   <MemberSidebar />
   <div className="w-full p-4 ml-64">{children}</div>
  </div>
 );
}

