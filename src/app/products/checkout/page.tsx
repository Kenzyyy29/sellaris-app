// /app/packages/checkout/page.tsx
"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import {useSubscriptionPackages} from "@/hooks/useSubscriptionPackages";
import {useUserSubscription} from "@/hooks/useUserSubscription";
import {useState} from "react";

export default function CheckoutPage() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const packageId = searchParams.get("packageId");
 const {data: session}: {data: any} = useSession();
 const {packages, loading: packagesLoading} = useSubscriptionPackages();
 const {createSubscription, loading: subscriptionLoading} =
  useUserSubscription();
 const [paymentMethod, setPaymentMethod] = useState<string>("bank-transfer");

 const selectedPackage = packages.find((pkg) => pkg.id === packageId);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!session?.user?.id || !selectedPackage) return;

  try {
   const result = await createSubscription({
    userId: session.user.id,
    packageId: selectedPackage.id!,
    packageName: selectedPackage.name,
    price: selectedPackage.price,
    duration: selectedPackage.duration,
    startDate: new Date(),
    endDate: new Date(
     new Date().setMonth(new Date().getMonth() + selectedPackage.duration)
    ),
   });

   if (result.success) {
    router.push(`/payment/confirm?subscriptionId=${result.id}`);
   }
  } catch (error) {
   console.error("Checkout failed:", error);
  }
 };

 if (packagesLoading) return <div>Loading package details...</div>;
 if (!selectedPackage) return <div>Package not found</div>;

 return (
  <div className="max-w-4xl mx-auto py-8 px-4">
   <h1 className="text-2xl font-bold mb-6">Checkout</h1>

   <div className="grid md:grid-cols-2 gap-8">
    <div className="bg-white p-6 rounded-lg shadow">
     <h2 className="text-xl font-semibold mb-4">Package Details</h2>
     <div className="space-y-4">
      <div>
       <h3 className="text-lg font-medium">{selectedPackage.name}</h3>
       <p className="text-gray-600">{selectedPackage.description}</p>
      </div>
      <div className="flex justify-between">
       <span>Duration:</span>
       <span>{selectedPackage.duration} months</span>
      </div>
      <div className="flex justify-between font-medium">
       <span>Total Price:</span>
       <span>
        {new Intl.NumberFormat("id-ID", {
         style: "currency",
         currency: "IDR",
         minimumFractionDigits: 0,
        }).format(selectedPackage.price)}
       </span>
      </div>
     </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow">
     <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
     <form onSubmit={handleSubmit}>
      <div className="space-y-4">
       <div>
        <label className="flex items-center space-x-2">
         <input
          type="radio"
          name="paymentMethod"
          value="bank-transfer"
          checked={paymentMethod === "bank-transfer"}
          onChange={() => setPaymentMethod("bank-transfer")}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
         />
         <span>Bank Transfer</span>
        </label>
       </div>
       <div>
        <label className="flex items-center space-x-2">
         <input
          type="radio"
          name="paymentMethod"
          value="credit-card"
          checked={paymentMethod === "credit-card"}
          onChange={() => setPaymentMethod("credit-card")}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
         />
         <span>Credit Card</span>
        </label>
       </div>
       <div>
        <label className="flex items-center space-x-2">
         <input
          type="radio"
          name="paymentMethod"
          value="e-wallet"
          checked={paymentMethod === "e-wallet"}
          onChange={() => setPaymentMethod("e-wallet")}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
         />
         <span>E-Wallet (OVO, Gopay, Dana)</span>
        </label>
       </div>
      </div>

      <div className="mt-8">
       <button
        type="submit"
        disabled={subscriptionLoading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50">
        {subscriptionLoading ? "Processing..." : "Complete Payment"}
       </button>
      </div>
     </form>
    </div>
   </div>
  </div>
 );
}
