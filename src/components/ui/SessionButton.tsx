"use client";
import {signIn, signOut, useSession} from "next-auth/react";
import {useState} from "react";

export default function SessionButton() {
 const {data: session, status}: {data: any; status: string} = useSession();
 return (
  <div>
   {status === "authenticated" ? (
    <div className="flex">
     {session?.user?.fullname}
    </div>
   ) : (
    <button onClick={() => signIn()}>Sign In</button>
   )}{" "}
  </div>
 );
}
