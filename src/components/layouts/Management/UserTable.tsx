"use client";

import {useState} from "react";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/lib/firebase/init";
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
   await deleteUser(userToDelete.id);
   setIsDeleteModalOpen(false);
   setUserToDelete(null);
  }
 };

 const handleSaveEdit = async (updatedData: Partial<User>) => {
  if (userToEdit) {
   try {
    const userRef = doc(db, "users", userToEdit.id);
    await updateDoc(userRef, updatedData);

    setUser(
     users.map((user) =>
      user.id === userToEdit.id ? {...user, ...updatedData} : user
     )
    );

    setIsEditModalOpen(false);
    alert("User berhasil diupdate!");
   } catch (error) {
    console.error("Error updating user:", error);
    alert("Gagal mengupdate user");
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
   <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-200">
     <thead>
      <tr className="bg-gray-500 text-white">
       <th className="py-2 px-4 border border-gray-200">#</th>
       <th className="py-2 px-4 border border-gray-200 w-[250px]">Name</th>
       <th className="py-2 px-4 border border-gray-200 w-[250px]">Email</th>
       <th className="py-2 px-4 border border-gray-200">Phone</th>
       <th className="py-2 px-4 border border-gray-200">Role</th>
       <th className="py-2 px-4 border border-gray-200">Actions</th>
      </tr>
     </thead>
     <tbody>
      {users.map((user: User, index: number) => (
       <tr
        key={user.id}
        className="hover:bg-gray-50 text-center">
        <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
        <td className="py-2 px-4 border border-gray-200">{user.fullname}</td>
        <td className="py-2 px-4 border border-gray-200">{user.email}</td>
        <td className="py-2 px-4 border border-gray-200">{user.phone}</td>
        <td className="py-2 px-4 border border-gray-200">{user.role}</td>
        <td className="py-2 px-4 border border-gray-200">
         <div className="flex gap-2 justify-center">
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
