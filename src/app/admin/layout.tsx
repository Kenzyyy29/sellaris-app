import AdminSidebar from "@/components/layouts/AdminSidebar";
import {Metadata} from "next";

export const metadata: Metadata = {
 title: "Sellaris Web Master",
 description: "Sellaris Web Master",
}


export default function AdminLayout({children}: {children: React.ReactNode}) {
 return (
  <div className="flex">
   <AdminSidebar />
   <div className="w-full p-4 ml-64">{children}</div>
  </div>
 );
}
