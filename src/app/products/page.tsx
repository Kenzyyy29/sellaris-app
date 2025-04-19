// /app/packages/page.tsx
"use client";

import {useSubscriptionPackages} from "@/hooks/useSubscriptionPackages";
import {useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function PackagesPage() {
 const {packages, loading} = useSubscriptionPackages();
 const {data: session} = useSession();
 const router = useRouter();
 const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

 const packageStyles = {
  silver: {
   bg: "bg-gray-100",
   border: "border-gray-300",
   text: "text-gray-800",
   button: "bg-gray-600 hover:bg-gray-700",
   selectedButton: "bg-gray-700",
  },
  gold: {
   bg: "bg-yellow-50",
   border: "border-yellow-300",
   text: "text-yellow-800",
   button: "bg-yellow-600 hover:bg-yellow-700",
   selectedButton: "bg-yellow-700",
  },
  diamond: {
   bg: "bg-blue-50",
   border: "border-blue-300",
   text: "text-blue-800",
   button: "bg-blue-600 hover:bg-blue-700",
   selectedButton: "bg-blue-700",
  },
  default: {
   bg: "bg-white",
   border: "border-gray-200",
   text: "text-gray-800",
   button: "bg-indigo-600 hover:bg-indigo-700",
   selectedButton: "bg-indigo-700",
  },
 };

 const getPackageStyle = (packageName: string) => {
  const lowerName = packageName.toLowerCase();
  if (lowerName.includes("silver")) return packageStyles.silver;
  if (lowerName.includes("gold")) return packageStyles.gold;
  if (lowerName.includes("diamond")) return packageStyles.diamond;
  return packageStyles.default;
 };

const handleSelectPackage = (packageId: string) => {
 if (!session) {
  router.push("/auth/login?callbackUrl=/packages");
  return;
 }
 router.push(`/products/checkout?packageId=${packageId}`);
};

 if (loading) {
  return <div className="p-6 text-center">Loading packages...</div>;
 }

 return (
  <div className="py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-7xl mx-auto">
    <div className="text-center">
     <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
      Choose Your Plan
     </h1>
     <p className="mt-4 text-xl text-gray-600">
      Select the package that fits your business needs
     </p>
    </div>

    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
     {packages.map((pkg) => {
      const style = getPackageStyle(pkg.name);
      const isRecommended = pkg.isRecommended;

      return (
       <div
        key={pkg.id}
        className={`relative rounded-lg border-2 p-8 shadow-sm transition-all duration-300 hover:shadow-md ${
         selectedPackage === pkg.id
          ? `ring-2 ring-offset-2 ${style.border} transform scale-105`
          : style.border
        } ${style.bg}`}>
        {isRecommended && (
         <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Recommended
         </div>
        )}

        <div className="text-center">
         <h2 className={`text-2xl font-bold ${style.text}`}>{pkg.name}</h2>
         <p className={`mt-2 ${style.text}`}>{pkg.description}</p>
        </div>

        <div className="mt-8">
         <div className="text-center">
          <span className={`text-4xl font-bold ${style.text}`}>
           {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
           }).format(pkg.price)}
          </span>
          <span className={`text-lg font-medium ${style.text}`}>
           /{pkg.duration} month{pkg.duration !== 1 ? "s" : ""}
          </span>
         </div>
        </div>

        <div className="mt-8">
         <h3 className={`text-lg font-medium ${style.text}`}>Features</h3>
         <ul className="mt-4 space-y-3">
          {pkg.features.map((feature) => (
           <li
            key={feature}
            className="flex items-start">
            <svg
             className="h-6 w-6 flex-shrink-0 text-green-500"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor">
             <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
             />
            </svg>
            <span className={`ml-3 ${style.text}`}>{feature}</span>
           </li>
          ))}
         </ul>
        </div>

        <div className="mt-8">
         <button
          onClick={() => handleSelectPackage(pkg.id!)}
          className={`w-full rounded-md py-3 px-4 text-center text-sm font-medium text-white ${
           selectedPackage === pkg.id ? style.selectedButton : style.button
          }`}>
          {selectedPackage === pkg.id ? "Selected" : "Select Plan"}
         </button>
        </div>
       </div>
      );
     })}
    </div>
   </div>
  </div>
 );
}
