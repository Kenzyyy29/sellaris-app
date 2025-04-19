// /hooks/useSubscriptionPackages.ts
import {useState, useEffect} from "react";
import {
 collection,
 addDoc,
 getDocs,
 doc,
 updateDoc,
 deleteDoc,
} from "firebase/firestore";
import {db} from "@/lib/firebase/init";

export interface SubscriptionPackage {
 id?: string;
 name: string;
 description: string;
 duration: number;
 price: number;
 features: string[];
 isActive: boolean;
 isRecommended?: boolean;
 created_at?: Date;
 updated_at?: Date;
}

export const useSubscriptionPackages = () => {
 const [packages, setPackages] = useState<SubscriptionPackage[]>([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const fetchPackages = async () => {
  try {
   setLoading(true);
   const querySnapshot = await getDocs(collection(db, "appProducts"));
   const packagesData: SubscriptionPackage[] = [];
   querySnapshot.forEach((doc) => {
    packagesData.push({id: doc.id, ...doc.data()} as SubscriptionPackage);
   });
   setPackages(packagesData);
  } catch (err) {
   setError("Failed to fetch packages");
   console.error("Error fetching packages:", err);
  } finally {
   setLoading(false);
  }
 };

 const addPackage = async (packageData: Omit<SubscriptionPackage, "id">) => {
  try {
   setLoading(true);
   const docRef = await addDoc(collection(db, "appProducts"), {
    ...packageData,
    created_at: new Date(),
    updated_at: new Date(),
   });
   setPackages([...packages, {id: docRef.id, ...packageData}]);
   return {success: true, id: docRef.id};
  } catch (err) {
   setError("Failed to add package");
   console.error("Error adding package:", err);
   return {success: false};
  } finally {
   setLoading(false);
  }
 };

 const updatePackage = async (
  id: string,
  updatedData: Partial<SubscriptionPackage>
 ) => {
  try {
   setLoading(true);
   await updateDoc(doc(db, "appProducts", id), {
    ...updatedData,
    updated_at: new Date(),
   });
   setPackages(
    packages.map((pkg) => (pkg.id === id ? {...pkg, ...updatedData} : pkg))
   );
   return {success: true};
  } catch (err) {
   setError("Failed to update package");
   console.error("Error updating package:", err);
   return {success: false};
  } finally {
   setLoading(false);
  }
 };

 const deletePackage = async (id: string) => {
  try {
   setLoading(true);
   await deleteDoc(doc(db, "appProducts", id));
   setPackages(packages.filter((pkg) => pkg.id !== id));
   return {success: true};
  } catch (err) {
   setError("Failed to delete package");
   console.error("Error deleting package:", err);
   return {success: false};
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchPackages();
 }, []);

 return {
  packages,
  loading,
  error,
  addPackage,
  updatePackage,
  deletePackage,
  fetchPackages,
 };
};
