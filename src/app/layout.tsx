"use client";

import {Lato} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import {usePathname} from "next/navigation";
import {SessionProvider} from "next-auth/react";

const lato = Lato({
 weight: ["400", "700"],
 style: ["normal", "italic"],
 subsets: ["latin"],
 variable: "--font-lato",
});

const disableNavbar = ["sign-in", "sign-up", "dashboard"];

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 const pathname = usePathname();

 return (
  <html lang="en">
   <SessionProvider>
    <body className={`${lato.className} antialiased`}>
     {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
     {children}
    </body>
   </SessionProvider>
  </html>
 );
}
