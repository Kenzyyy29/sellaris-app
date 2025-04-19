// /hooks/useUserSubscription.ts
import {useState, useEffect} from "react";
import {
 collection,
 addDoc,
 getDocs,
 doc,
 updateDoc,
 query,
 where,
} from "firebase/firestore";
import {db} from "@/lib/firebase/init";

export interface UserSubscription {
 id?: string;
 userId: string;
 packageId: string;
 packageName: string;
 startDate: Date;
 endDate: Date;
 price: number;
 duration: number;
 status: "active" | "expired" | "canceled";
 paymentStatus: "pending" | "paid" | "failed";
 createdAt?: Date;
 updatedAt?: Date;
}

export const useUserSubscription = (userId?: string) => {
 const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const fetchSubscriptions = async (id: string) => {
  try {
   setLoading(true);
   const q = query(
    collection(db, "userSubscriptions"),
    where("userId", "==", id)
   );
   const querySnapshot = await getDocs(q);
   const data: UserSubscription[] = [];
   querySnapshot.forEach((doc) => {
    const docData = doc.data();
    data.push({
     id: doc.id,
     userId: docData.userId,
     packageId: docData.packageId,
     packageName: docData.packageName,
     price: docData.price,
     duration: docData.duration,
     startDate: docData.startDate.toDate(),
     endDate: docData.endDate.toDate(),
     status: docData.status,
     paymentStatus: docData.paymentStatus,
     createdAt: docData.createdAt?.toDate(),
     updatedAt: docData.updatedAt?.toDate(),
    });
   });
   setSubscriptions(data);
  } catch (err) {
   setError("Failed to fetch subscriptions");
   console.error("Error fetching subscriptions:", err);
  } finally {
   setLoading(false);
  }
 };

 const createSubscription = async (
  subscriptionData: Omit<
   UserSubscription,
   "id" | "status" | "paymentStatus" | "createdAt" | "updatedAt"
  >
 ) => {
  try {
   setLoading(true);
   const docRef = await addDoc(collection(db, "userSubscriptions"), {
    ...subscriptionData,
    status: "active",
    paymentStatus: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
   });

   const newSubscription: UserSubscription = {
    ...subscriptionData,
    id: docRef.id,
    status: "active",
    paymentStatus: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
   };

   setSubscriptions([...subscriptions, newSubscription]);
   return {success: true, id: docRef.id};
  } catch (err) {
   setError("Failed to create subscription");
   console.error("Error creating subscription:", err);
   return {success: false};
  } finally {
   setLoading(false);
  }
 };

 const cancelSubscription = async (subscriptionId: string) => {
  try {
   setLoading(true);
   await updateDoc(doc(db, "userSubscriptions", subscriptionId), {
    status: "canceled",
    updatedAt: new Date(),
   });
   setSubscriptions(
    subscriptions.map((sub) =>
     sub.id === subscriptionId ? {...sub, status: "canceled"} : sub
    )
   );
   return {success: true};
  } catch (err) {
   setError("Failed to cancel subscription");
   console.error("Error canceling subscription:", err);
   return {success: false};
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  if (userId) {
   fetchSubscriptions(userId);
  }
 }, [userId]);

 return {
  subscriptions,
  loading,
  error,
  createSubscription,
  cancelSubscription,
  fetchSubscriptions,
 };
};
