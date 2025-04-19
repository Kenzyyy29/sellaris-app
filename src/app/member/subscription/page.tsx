"use client";

import {useSession} from "next-auth/react";
import {useUserSubscription} from "@/hooks/useUserSubscription";
import {useState} from "react";

export default function UserSubscriptionsPage() {
 const {data: session}: {data: any} = useSession();
 const userId = session?.user?.id;
 const {subscriptions, loading, cancelSubscription} =
  useUserSubscription(userId);
 const [cancelingId, setCancelingId] = useState<string | null>(null);

 const handleCancel = async (subscriptionId: string) => {
  if (!userId) return;

  setCancelingId(subscriptionId);
  try {
   await cancelSubscription(subscriptionId);
  } finally {
   setCancelingId(null);
  }
 };

 if (loading) return <div>Loading your subscriptions...</div>;

 return (
  <div className="max-w-4xl mx-auto py-8 px-4">
   <h1 className="text-2xl font-bold mb-6">My Subscriptions</h1>

   {subscriptions.length === 0 ? (
    <div className="bg-white p-6 rounded-lg shadow text-center">
     <p>You don't have any active subscriptions</p>
    </div>
   ) : (
    <div className="space-y-4">
     {subscriptions.map((sub) => (
      <div
       key={sub.id}
       className="bg-white p-6 rounded-lg shadow">
       <div className="flex justify-between items-start">
        <div>
         <h2 className="text-xl font-semibold">{sub.packageName}</h2>
         <p
          className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
           sub.status === "active"
            ? "bg-green-100 text-green-800"
            : sub.status === "canceled"
            ? "bg-gray-100 text-gray-800"
            : "bg-red-100 text-red-800"
          }`}>
          {sub.status.toUpperCase()}
         </p>
        </div>
        <div className="text-right">
         <p className="text-lg font-medium">
          {new Intl.NumberFormat("id-ID", {
           style: "currency",
           currency: "IDR",
           minimumFractionDigits: 0,
          }).format(sub.price)}
         </p>
         <p className="text-sm text-gray-600">{sub.duration} months</p>
        </div>
       </div>

       <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
         <p className="text-sm text-gray-500">Start Date</p>
         <p>{new Date(sub.startDate).toLocaleDateString()}</p>
        </div>
        <div>
         <p className="text-sm text-gray-500">End Date</p>
         <p>{new Date(sub.endDate).toLocaleDateString()}</p>
        </div>
       </div>

       {sub.status === "active" && (
        <div className="mt-4">
         <button
          onClick={() => handleCancel(sub.id!)}
          disabled={cancelingId === sub.id}
          className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50">
          {cancelingId === sub.id ? "Canceling..." : "Cancel Subscription"}
         </button>
        </div>
       )}
      </div>
     ))}
    </div>
   )}
  </div>
 );
}
