"use client";
import "./globals.css";
import {usePathname} from "next/navigation";
import {SessionProvider} from "next-auth/react";
import Navbar from "@/components/layouts/Navbar";

export default function RootLayout({children}: {children: React.ReactNode}) {
 const pathname = usePathname();
 const noNavbarPaths = [
  "/sign-in",
  "/sign-up",
  "/admin",
  "/admin/*",
  "/member",
  "/member/*",
 ];

 const showNavbar = !noNavbarPaths.some(
  (path) => pathname === path || pathname.startsWith(`${path}/`)
 );

 return (
  <html lang="en">
   <SessionProvider
    refetchInterval={300}
    refetchOnWindowFocus={true}>
    <body>
     {showNavbar && <Navbar />}
     {children}
    </body>
   </SessionProvider>
  </html>
 );
}
