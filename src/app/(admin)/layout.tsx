import Sidebar from "@/components/layouts/Sidebar";

export default function AdminLayout({children}: {children: React.ReactNode}) {
 return (
  <div className="flex">
   <Sidebar />
   <div className="w-full p-4">{children}</div>
  </div>
 );
}
