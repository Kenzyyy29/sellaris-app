"use client";

import {useUsers} from "@/hooks/useUsers";
import {useEffect, useState} from "react";
import AdminSettingsForm from "@/components/layouts/Admin/Settings/AdminSettingsForm";

interface AdminUser {
 id: string;
 fullname: string;
 email: string;
 phone: string;
 role: string;
}

export default function AdminSettingsPage() {
 const {users, loading, fetchUsers} = useUsers(); // Gunakan 'users' bukan 'user'
 const [admins, setAdmins] = useState<AdminUser[]>([]);
 const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);

 useEffect(() => {
  if (users.length > 0) {
   const adminUsers = users.filter((user: AdminUser) => user.role === "admin"); // Tambahkan tipe untuk parameter
   setAdmins(adminUsers);
   if (adminUsers.length > 0 && !selectedAdmin) {
    setSelectedAdmin(adminUsers[0]);
   }
  }
 }, [users]);
 const handleAdminSelect = (admin: AdminUser) => {
  setSelectedAdmin(admin);
 };

 const handleUpdate = () => {
  fetchUsers();
 };

 if (loading) {
  return <div className="p-4">Loading...</div>;
 }

 return (
  <div>
   <div className="flex flex-col md:flex-row gap-6">
    <div className="w-full md:w-1/3">
     <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Admin List</h2>
      <div className="space-y-2">
       {admins.length > 0 ? (
        admins.map((admin) => (
         <div
          key={admin.id}
          onClick={() => handleAdminSelect(admin)}
          className={`p-3 rounded-lg cursor-pointer ${
           selectedAdmin?.id === admin.id
            ? "bg-blue-100 border border-blue-300"
            : "hover:bg-gray-100"
          }`}>
          <h3 className="font-medium">{admin.fullname}</h3>
          <p className="text-sm text-gray-600">{admin.email}</p>
         </div>
        ))
       ) : (
        <p className="text-gray-500">No admin users found</p>
       )}
      </div>
     </div>
    </div>

    <div className="w-full md:w-2/3">
     {selectedAdmin ? (
      <AdminSettingsForm
       admin={selectedAdmin}
       onUpdate={handleUpdate}
      />
     ) : (
      <div className="bg-white p-6 rounded-lg shadow-md">
       <p>Select an admin to edit</p>
      </div>
     )}
    </div>
   </div>
  </div>
 );
}
