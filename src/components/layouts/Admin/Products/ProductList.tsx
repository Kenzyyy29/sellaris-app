// /components/admin/PackagesList.tsx
"use client";

import {useState} from "react";
import ProductForm from "./ProductForm";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import {FaPencil, FaTrash} from "react-icons/fa6";

interface ProductListProps {
 packages: SubscriptionPackage[];
 onAddPackage: (data: Omit<SubscriptionPackage, "id">) => Promise<void>;
 onUpdatePackage: (
  id: string,
  data: Partial<SubscriptionPackage>
 ) => Promise<void>;
 onDeletePackage: (id: string) => Promise<void>;
}

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

export default function ProductList({
 packages,
 onAddPackage,
 onUpdatePackage,
 onDeletePackage,
}: ProductListProps) {
 const [showForm, setShowForm] = useState(false);
 const [editingPackage, setEditingPackage] =
  useState<SubscriptionPackage | null>(null);
 const [showConfirmDialog, setShowConfirmDialog] = useState(false);
 const [packageToDelete, setPackageToDelete] = useState<string | null>(null);

 const handleEdit = (pkg: SubscriptionPackage) => {
  setEditingPackage(pkg);
  setShowForm(true);
 };

 const handleDeleteClick = (id: string) => {
  setPackageToDelete(id);
  setShowConfirmDialog(true);
 };

 const handleConfirmDelete = async () => {
  if (packageToDelete) {
   await onDeletePackage(packageToDelete);
   setShowConfirmDialog(false);
   setPackageToDelete(null);
  }
 };

 const handleCancelDelete = () => {
  setShowConfirmDialog(false);
  setPackageToDelete(null);
 };

 const handleSubmit = async (data: Omit<SubscriptionPackage, "id">) => {
  if (editingPackage) {
   await onUpdatePackage(editingPackage.id!, data);
  } else {
   await onAddPackage(data);
  }
  setShowForm(false);
  setEditingPackage(null);
 };

 return (
  <div className="space-y-6">
   <ConfirmationDialog
    isOpen={showConfirmDialog}
    title="Confirm Delete"
    message="Are you sure you want to delete this package? This action cannot be undone."
    onConfirm={handleConfirmDelete}
    onCancel={handleCancelDelete}
   />

   <div className="flex justify-between items-center">
    <h2 className="text-xl font-bold">Subscription Packages</h2>
    <button
     onClick={() => {
      setEditingPackage(null);
      setShowForm(true);
     }}
     className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:hover:bg-[#395c55] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
     Add New Package
    </button>
   </div>

   {showForm && (
    <div className="bg-white p-6 rounded-lg shadow">
     <ProductForm
      initialData={editingPackage || undefined}
      onSubmit={handleSubmit}
      onCancel={() => {
       setShowForm(false);
       setEditingPackage(null);
      }}
     />
    </div>
   )}

   <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {packages.map((pkg) => (
     <div
      key={pkg.id}
      className={`relative rounded-lg border p-6 shadow-sm ${
       pkg.isActive ? "border-gray-400" : "border-gray-200"
      } ${pkg.isRecommended ? "ring-2 ring-primary" : ""}`}>
      {pkg.isRecommended && (
       <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
        Recommended
       </div>
      )}

      <div className="flex justify-between">
       <h3 className="text-lg font-medium">{pkg.name}</h3>
       <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
         pkg.isActive
          ? "bg-green-100 text-green-800"
          : "bg-gray-100 text-gray-800"
        }`}>
        {pkg.isActive ? "Active" : "Inactive"}
       </span>
      </div>

      <p className="mt-2 text-sm text-gray-600">{pkg.description}</p>

      <div className="mt-4">
       <div className="flex justify-between text-sm mt-1">
        <span>Price:</span>
        <span className="font-medium">
         {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
         }).format(pkg.price)}
        </span>
       </div>
      </div>

      <div className="mt-4">
       <h4 className="text-sm font-medium">Features:</h4>
       <ul className="mt-2 space-y-1">
        {pkg.features.map((feature) => (
         <li
          key={feature}
          className="text-sm text-gray-600">
          • {feature}
         </li>
        ))}
       </ul>
      </div>

      <div className="mt-6 flex justify-end space-x-2">
       <button
        onClick={() => handleEdit(pkg)}
        className="p-1 text-indigo-600 hover:text-indigo-900"
        title="Edit">
        <FaPencil className="h-5 w-5" />
       </button>
       <button
        onClick={() => handleDeleteClick(pkg.id!)}
        className="p-1 text-red-600 hover:text-red-900"
        title="Delete">
        <FaTrash className="h-5 w-5" />
       </button>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
}
