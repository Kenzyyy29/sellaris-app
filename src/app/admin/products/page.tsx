"use client";
import {useSubscriptionPackages} from "@/hooks/useSubscriptionPackages";
import ProductList from "@/components/layouts/Admin/Products/ProductList";

interface SubscriptionPackage {
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

export default function AdminPackagesPage() {
 const {packages, loading, error, addPackage, updatePackage, deletePackage} =
  useSubscriptionPackages();

 const handleAddPackage = async (data: Omit<SubscriptionPackage, "id">) => {
  await addPackage(data);
 };

 const handleUpdatePackage = async (
  id: string,
  data: Partial<SubscriptionPackage>
 ) => {
  await updatePackage(id, data);
 };

 const handleDeletePackage = async (id: string) => {
  await deletePackage(id);
 };

 if (loading && packages.length === 0) {
  return <div className="p-6">Loading packages...</div>;
 }

 if (error) {
  return <div className="p-6 text-red-600">Error: {error}</div>;
 }

 return (
  <div className="p-6">
   <ProductList
    packages={packages}
    onAddPackage={handleAddPackage}
    onUpdatePackage={handleUpdatePackage}
    onDeletePackage={handleDeletePackage}
   />
  </div>
 );
}
