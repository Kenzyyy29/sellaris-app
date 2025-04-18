// app/admin/dashboard/page.tsx
"use client";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function AdminDashboard() {
 const {data: session, status}: {data: any; status: any} = useSession();
 const router = useRouter();
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  if (status === "unauthenticated") {
   router.push("/sign-in?callbackUrl=/admin/dashboard");
  } else if (status === "authenticated" && session?.user?.role !== "admin") {
   router.push("/");
  } else if (status === "authenticated") {
   setIsLoading(false);
  }
 }, [status, session, router]);

 if (isLoading) {
  return (
   <div className="flex justify-center items-center h-screen">
    <div>Loading dashboard...</div>
   </div>
  );
 }

 return (
  <div className="p-6">
   <h1 className="text-2xl font-bold">Admin Dashboard</h1>
   {/* Konten dashboard admin */}
  </div>
 );
}
