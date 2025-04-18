// components/DashboardRedirect.tsx
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardRedirect = () => {
  const { data: session, status }: {data: any; status: string} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "admin") {
        router.push("/admin/dashboard");
      } else if (session?.user?.role === "member") {
        router.push("/member/dashboard");
      }
    }
  }, [status, session, router]);

  return <div>Loading...</div>;
};

export default DashboardRedirect;