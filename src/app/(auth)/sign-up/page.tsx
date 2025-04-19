"use client";
import {useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";
import SignUpStep1 from "@/components/ui/SignUpStep1";
import SignUpStep2 from "@/components/ui/SignUpStep2";

export default function SignUpPage() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const callbackUrl = searchParams.get("callbackUrl") || "/";
 const [step, setStep] = useState(1);
 const [step1Data, setStep1Data] = useState<any>(null);
 const [error, setError] = useState("");

 const handleStep1Complete = (data: any) => {
  setStep1Data(data);
  setStep(2);
 };

 const handleStep2Back = () => {
  setStep(1);
 };

 const handleSubmit = async (completeData: any) => {
  try {
   const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(completeData),
   });

   const result = await res.json();

   if (result.status) {
    router.push(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
   } else {
    setError(result.message || "Registration failed");
   }
  } catch (err) {
   setError("An error occurred during registration");
  }
 };

 return (
  <div className=" flex items-center justify-center bg-gray-100 w-full">
   {step === 1 && <SignUpStep1 onNext={handleStep1Complete} />}
   {step === 2 && (
    <SignUpStep2
     step1Data={step1Data}
     onBack={handleStep2Back}
     onSubmit={handleSubmit}
    />
   )}
   {error && (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
     {error}
    </div>
   )}
  </div>
 );
}
