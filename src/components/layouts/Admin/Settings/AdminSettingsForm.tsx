"use client";
import {useState, useEffect} from "react";
import {useUsers} from "@/hooks/useUsers";

interface AdminEditFormProps {
 admin: {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  role: string;
 };
 onUpdate: () => void;
}

const AdminSettingsForm = ({admin, onUpdate}: AdminEditFormProps) => {
 const [formData, setFormData] = useState({
  fullname: admin.fullname,
  email: admin.email,
  phone: admin.phone,
 });
 const {updateUser} = useUsers();
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [message, setMessage] = useState({text: "", type: ""});

 useEffect(() => {
  setFormData({
   fullname: admin.fullname,
   email: admin.email,
   phone: admin.phone,
  });
 }, [admin]);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]: value,
  }));
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
   const success = await updateUser(admin.id, formData);
   if (success) {
    setMessage({text: "Admin updated successfully", type: "success"});
    onUpdate();
   } else {
    setMessage({text: "Failed to update admin", type: "error"});
   }
  } catch (error) {
   setMessage({text: "An error occurred", type: "error"});
  } finally {
   setIsSubmitting(false);
   setTimeout(() => setMessage({text: "", type: ""}), 3000);
  }
 };

 return (
  <div className="bg-white p-6 rounded-lg shadow-md">
   <h2 className="text-xl font-semibold mb-4">Edit Admin Information</h2>
   {message.text && (
    <div
     className={`mb-4 p-2 rounded ${
      message.type === "success"
       ? "bg-green-100 text-green-800"
       : "bg-red-100 text-red-800"
     }`}>
     {message.text}
    </div>
   )}
   <form onSubmit={handleSubmit}>
    <div className="mb-4">
     <label
      className="block text-gray-700 mb-2"
      htmlFor="fullname">
      Full Name
     </label>
     <input
      type="text"
      id="fullname"
      name="fullname"
      value={formData.fullname}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded-lg"
      required
     />
    </div>
    <div className="mb-4">
     <label
      className="block text-gray-700 mb-2"
      htmlFor="email">
      Email
     </label>
     <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      className="w-full px-3 py-2 border rounded-lg border-gray-400 text-gray-400"
      disabled
     />
    </div>
    <div className="mb-4">
     <label
      className="block text-gray-700 mb-2"
      htmlFor="phone">
      Phone
     </label>
     <input
      type="tel"
      id="phone"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded-lg"
      required
     />
    </div>
    <button
     type="submit"
     disabled={isSubmitting}
     className={`px-4 py-2 rounded-lg ${
      isSubmitting ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
     } text-white`}>
     {isSubmitting ? "Updating..." : "Update Admin"}
    </button>
   </form>
  </div>
 );
};

export default AdminSettingsForm;
