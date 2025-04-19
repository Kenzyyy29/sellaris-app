"use client";
import {useState} from "react";

interface PackageFormProps {
 initialData?: SubscriptionPackage;
 onSubmit: (data: Omit<SubscriptionPackage, "id">) => Promise<void>;
 onCancel?: () => void;
}

interface SubscriptionPackage {
 id?: string;
 name: string;
 description: string;
 duration: number; // in months
 price: number; // Changed from pricePercentage to price
 features: string[];
 isActive: boolean;
 isRecommended?: boolean;
 created_at?: Date;
 updated_at?: Date;
}

export default function ProductForm({
 initialData,
 onSubmit,
 onCancel,
}: PackageFormProps) {
 const [formData, setFormData] = useState<Omit<SubscriptionPackage, "id">>({
  name: initialData?.name || "",
  description: initialData?.description || "",
  duration: initialData?.duration || 12,
  price: initialData?.price || 0,
  features: initialData?.features || [],
  isActive: initialData?.isActive || true,
  isRecommended: initialData?.isRecommended || false,
 });
 const [newFeature, setNewFeature] = useState("");
 const [isSubmitting, setIsSubmitting] = useState(false);

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
 ) => {
  const {name, value} = e.target;
  setFormData({
   ...formData,
   [name]:
    name === "duration" || name === "pricePercentage" ? Number(value) : value,
  });
 };

 const handleAddFeature = () => {
  if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
   setFormData({
    ...formData,
    features: [...formData.features, newFeature.trim()],
   });
   setNewFeature("");
  }
 };

 const handleRemoveFeature = (featureToRemove: string) => {
  setFormData({
   ...formData,
   features: formData.features.filter((feature) => feature !== featureToRemove),
  });
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
   await onSubmit(formData);
  } finally {
   setIsSubmitting(false);
  }
 };

 return (
  <form
   onSubmit={handleSubmit}
   className="space-y-4">
   <div>
    <label className="block text-sm font-medium text-gray-700">
     Package Name
    </label>
    <input
     type="text"
     name="name"
     value={formData.name}
     onChange={handleChange}
     className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
     required
    />
   </div>

   <div>
    <label className="block text-sm font-medium text-gray-700">
     Description
    </label>
    <textarea
     name="description"
     value={formData.description}
     onChange={handleChange}
     rows={3}
     className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
     required
    />
   </div>

   <div className="grid grid-cols-2 gap-4">
    <div>
     <label className="block text-sm font-medium text-gray-700">
      Duration (months)
     </label>
     <input
      type="number"
      name="duration"
      value={formData.duration}
      onChange={handleChange}
      min="1"
      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      required
     />
    </div>

    <div>
     <label className="block text-sm font-medium text-gray-700">
      Price (IDR)
     </label>
     <input
      type="number"
      name="price"
      value={formData.price}
      onChange={handleChange}
      min="0"
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      required
     />
    </div>
   </div>

   <div>
    <label className="block text-sm font-medium text-gray-700">Features</label>
    <div className="mt-1 flex">
     <input
      type="text"
      value={newFeature}
      onChange={(e) => setNewFeature(e.target.value)}
      className="block p-2 w-full rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      placeholder="Add a feature"
     />
     <button
      type="button"
      onClick={handleAddFeature}
      className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
      Add
     </button>
    </div>
    <div className="mt-2 flex flex-wrap gap-2">
     {formData.features.map((feature) => (
      <span
       key={feature}
       className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-primary">
       {feature}
       <button
        type="button"
        onClick={() => handleRemoveFeature(feature)}
        className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-primary hover:bg-indigo-200 hover:text-primary">
        ×
       </button>
      </span>
     ))}
    </div>
   </div>

   <div className="flex items-center space-x-4">
    <div className="flex items-center">
     <input
      id="isActive"
      name="isActive"
      type="checkbox"
      checked={formData.isActive}
      onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500"
     />
     <label
      htmlFor="isActive"
      className="ml-2 block text-sm text-gray-900">
      Active
     </label>
    </div>

    <div className="flex items-center">
     <input
      id="isRecommended"
      name="isRecommended"
      type="checkbox"
      checked={formData.isRecommended}
      onChange={(e) =>
       setFormData({...formData, isRecommended: e.target.checked})
      }
      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
     />
     <label
      htmlFor="isRecommended"
      className="ml-2 block text-sm text-gray-900">
      Recommended
     </label>
    </div>
   </div>

   <div className="flex justify-end space-x-3">
    {onCancel && (
     <button
      type="button"
      onClick={onCancel}
      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      Cancel
     </button>
    )}
    <button
     type="submit"
     disabled={isSubmitting}
     className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#395c55] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
     {isSubmitting ? "Saving..." : "Save Package"}
    </button>
   </div>
  </form>
 );
}
