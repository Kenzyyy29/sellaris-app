"use client";

import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import {useUsers} from "@/hooks/useUsers";
import {compare} from "bcryptjs";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/init";
import bcrypt from "bcryptjs";

interface User {
 id: string;
 fullname: string;
 email: string;
 phone: string;
 role: string;
 password?: string;
 created_at?: Date;
 updated_at?: Date;
}

export default function SettingsView() {
 const {data: session, status}: {data: any; status: string} = useSession();
 const {users, loading, updateUser} = useUsers();
 const [adminUsers, setAdminUsers] = useState<User[]>([]);
 const [selectedUser, setSelectedUser] = useState<User | null>(null);
 const [formData, setFormData] = useState({
  fullname: "",
  email: "",
  phone: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
 });
 const [message, setMessage] = useState({type: "", text: ""});

 // Redirect jika tidak authorized
 useEffect(() => {
  if (status === "unauthenticated") {
   redirect("/sign-in");
  } else if (status === "authenticated" && session.user?.role !== "admin") {
   redirect("/");
  }
 }, [status, session]);

 // Filter admin users
 useEffect(() => {
  if (users.length > 0) {
   const admins = users.filter((user) => user.role === "admin");
   setAdminUsers(admins);
  }
 }, [users]);

 // Set form data ketika user dipilih
 useEffect(() => {
  if (selectedUser) {
   setFormData({
    fullname: selectedUser.fullname,
    email: selectedUser.email,
    phone: selectedUser.phone,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
   });
   setMessage({type: "", text: ""});
  }
 }, [selectedUser]);

 const handleSelectUser = (user: User) => {
  setSelectedUser(user);
 };

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  setFormData((prev) => ({...prev, [name]: value}));
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validasi password baru jika diisi
  if (
   formData.newPassword &&
   formData.newPassword !== formData.confirmPassword
  ) {
   setMessage({
    type: "error",
    text: "Password baru dan konfirmasi password tidak sama",
   });
   return;
  }

  if (!selectedUser) return;

  try {
   // Jika ingin mengubah password, verifikasi password lama
   if (formData.newPassword) {
    if (!formData.oldPassword) {
     setMessage({type: "error", text: "Harap masukkan password lama"});
     return;
    }

    // Verifikasi password lama
    const userDoc = await getDoc(doc(db, "users", selectedUser.id));
    const userData = userDoc.data();

    if (!userData) {
     setMessage({type: "error", text: "User tidak ditemukan"});
     return;
    }

    const isOldPasswordValid = await compare(
     formData.oldPassword,
     userData.password
    );

    if (!isOldPasswordValid) {
     setMessage({type: "error", text: "Password lama tidak valid"});
     return;
    }
   }

   const updateData: Partial<User> = {
    fullname: formData.fullname,
    phone: formData.phone,
    updated_at: new Date(),
   };

   // Jika password baru diisi, update password
   if (formData.newPassword) {
    updateData.password = await bcrypt.hash(formData.newPassword, 10);
   }

   const success = await updateUser(selectedUser.id, updateData);

   if (success) {
    setMessage({type: "success", text: "Data admin berhasil diperbarui"});
    setFormData((prev) => ({
     ...prev,
     oldPassword: "",
     newPassword: "",
     confirmPassword: "",
    }));
   } else {
    setMessage({type: "error", text: "Gagal memperbarui data admin"});
   }
  } catch (error) {
   console.error("Error updating admin:", error);
   setMessage({type: "error", text: "Terjadi kesalahan saat memperbarui data"});
  }
 };

 if (status === "loading" || loading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <p>Loading...</p>
   </div>
  );
 }

 return (
  <div className="min-h-screen bg-gray-100 p-6">
   <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Pengaturan Admin</h1>

    {/* Daftar Admin */}
    <div className="mb-8">
     <h2 className="text-xl font-semibold mb-4 text-gray-700">Daftar Admin</h2>

     {adminUsers.length === 0 ? (
      <p className="text-gray-500">Tidak ada admin ditemukan</p>
     ) : (
      <div className="space-y-2">
       {adminUsers.map((user) => (
        <div
         key={user.id}
         className={`p-4 border rounded-lg cursor-pointer ${
          selectedUser?.id === user.id
           ? "border-blue-500 bg-blue-50"
           : "border-gray-200 hover:bg-gray-50"
         }`}
         onClick={() => handleSelectUser(user)}>
         <h3 className="font-medium">{user.fullname}</h3>
         <p className="text-sm text-gray-600">{user.email}</p>
        </div>
       ))}
      </div>
     )}
    </div>

    {/* Form Edit Admin */}
    {selectedUser && (
     <div className="border-t pt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
       Edit Admin: {selectedUser.fullname}
      </h2>

      {message.text && (
       <div
        className={`p-3 mb-4 rounded ${
         message.type === "success"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
        }`}>
        {message.text}
       </div>
      )}

      <form
       onSubmit={handleSubmit}
       className="space-y-4">
       <div>
        <label
         htmlFor="fullname"
         className="block text-sm font-medium text-gray-700 mb-1">
         Nama Lengkap
        </label>
        <input
         type="text"
         id="fullname"
         name="fullname"
         value={formData.fullname}
         onChange={handleInputChange}
         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
         required
        />
       </div>

       <div>
        <label
         htmlFor="email"
         className="block text-sm font-medium text-gray-700 mb-1">
         Email
        </label>
        <input
         type="email"
         id="email"
         name="email"
         value={formData.email}
         onChange={handleInputChange}
         className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
         disabled
        />
       </div>

       <div>
        <label
         htmlFor="phone"
         className="block text-sm font-medium text-gray-700 mb-1">
         Nomor HP
        </label>
        <input
         type="tel"
         id="phone"
         name="phone"
         value={formData.phone}
         onChange={handleInputChange}
         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
         required
        />
       </div>

       {/* Password Section */}
       <div className="pt-4 border-t mt-4">
        <h3 className="text-lg font-medium text-gray-800 mb-3">
         Ubah Password
        </h3>

        <div className="space-y-4">
         <div>
          <label
           htmlFor="oldPassword"
           className="block text-sm font-medium text-gray-700 mb-1">
           Password Lama
          </label>
          <input
           type="password"
           id="oldPassword"
           name="oldPassword"
           value={formData.oldPassword}
           onChange={handleInputChange}
           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
           placeholder="Masukkan password lama jika ingin mengubah"
          />
         </div>

         <div>
          <label
           htmlFor="newPassword"
           className="block text-sm font-medium text-gray-700 mb-1">
           Password Baru
          </label>
          <input
           type="password"
           id="newPassword"
           name="newPassword"
           value={formData.newPassword}
           onChange={handleInputChange}
           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
           placeholder="Masukkan password baru"
          />
         </div>

         {formData.newPassword && (
          <div>
           <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1">
            Konfirmasi Password Baru
           </label>
           <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Konfirmasi password baru"
           />
          </div>
         )}
        </div>
       </div>

       <div className="flex justify-end pt-4">
        <button
         type="submit"
         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
         Simpan Perubahan
        </button>
       </div>
      </form>
     </div>
    )}
   </div>
  </div>
 );
}
