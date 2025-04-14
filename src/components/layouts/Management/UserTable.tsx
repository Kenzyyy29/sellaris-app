"use client";

import {useState} from "react";
import {useUsers} from "@/hooks/useUsers";
import DeleteUserModal from "./DeleteUserModal";
import {IoMdTrash} from "react-icons/io";
import {FaRegEdit} from "react-icons/fa";
import UpdateUserModal from "./UpdateUserModal";

interface User {
 id: string;
 fullname: string;
 email: string;
 phone: string;
 role: string;
}

const UsersPage = () => {
 const [user, setUser] = useState<User[]>([]);
 const {users, loading, deleteUser} = useUsers();
 const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
 const [userToDelete, setUserToDelete] = useState<{
  id: string;
  name: string;
 } | null>(null);

 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 const [userToEdit, setUserToEdit] = useState<User | null>(null);

 const handleDeleteClick = (userId: string, userName: string) => {
  setUserToDelete({id: userId, name: userName});
  setIsDeleteModalOpen(true);
 };

 const handleEditClick = (user: User) => {
  setUserToEdit(user);
  setIsEditModalOpen(true);
 };

 const handleConfirmDelete = async () => {
  if (userToDelete) {
   try {
    const response = await fetch("/api/user", {
     method: "DELETE",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({id: userToDelete.id}),
    });

    if (!response.ok) {
     throw new Error("Failed to delete user");
    }

    setUser(users.filter((user) => user.id !== userToDelete.id));

    setIsDeleteModalOpen(false);
    setUserToDelete(null);
    alert("User berhasil dihapus!");
   } catch (error) {
    console.error("Error deleting user:", error);
    alert("Gagal menghapus user");
   }
  }
 };

 const handleSaveEdit = async (updatedData: Partial<User>) => {
  if (userToEdit) {
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userToEdit.id,
          ...updatedData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = { ...userToEdit, ...updatedData };
      setUser(users.map(user => (user.id === userToEdit.id ? updatedUser : user)));

      setIsEditModalOpen(false);
      alert('User berhasil diupdate!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Gagal mengupdate user');
    }
  }
};

 const handleCancelDelete = () => {
  setIsDeleteModalOpen(false);
  setUserToDelete(null);
 };

 if (loading) {
  return <div>Loading...</div>;
 }

 return (
  <div className="w-full">
   <div className="overflow-x-auto bg-white rounded-lg shadow ">
    <table className="min-w-full divide-y divide-gray-200">
     <thead className="bg-gray-50">
      <tr>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        #
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[250px]">
        Name
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[250px]">
        Email
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Phone
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Role
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Actions
       </th>
      </tr>
     </thead>
     <tbody>
      {users.map((user: User, index: number) => (
       <tr
        key={user.id}
        className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
         {index + 1}
        </td>
        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.fullname}</td>
        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.email}</td>
        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.phone}</td>
        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.role}</td>
        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
         <div className="flex gap-2 ">
          <button
           onClick={() => handleEditClick(user)}
           className="bg-blue-500 text-white px-4 cursor-pointer py-2 rounded w-full flex items-center justify-center">
           <FaRegEdit />
          </button>
          <button
           onClick={() => handleDeleteClick(user.id, user.fullname)}
           className="bg-red-500 text-white px-4 cursor-pointer py-2 rounded w-full     flex items-center justify-center">
           <IoMdTrash />
          </button>
         </div>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
   <DeleteUserModal
    isOpen={isDeleteModalOpen}
    onClose={handleCancelDelete}
    onConfirm={handleConfirmDelete}
    userName={userToDelete?.name || ""}
   />

   <UpdateUserModal
    isOpen={isEditModalOpen}
    onClose={() => setIsEditModalOpen(false)}
    onSave={handleSaveEdit}
    userData={{
     fullname: userToEdit?.fullname || "",
     email: userToEdit?.email || "",
     phone: userToEdit?.phone || "",
     role: userToEdit?.role || "user",
    }}
   />
  </div>
 );
};

export default UsersPage;
