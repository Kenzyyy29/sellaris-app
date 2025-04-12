"use client";
import React, {useState, useEffect} from "react";
import {FaRegEdit} from "react-icons/fa";
import {IoMdTrash} from "react-icons/io";
import DeleteUserModal from "./DeleteUserModal";
import UpdateUserModal from "./UpdateUserModal";

interface User {
 id: string;
 fullname: string;
 email: string;
 phone: string;
 role: string;
}

const UserTable: React.FC = () => {
 const [users, setUsers] = useState<User[]>([]);
 const [loading, setLoading] = useState(true);
 const [openUpdate, setOpenUpdate] = useState(false);
 const [openDelete, setOpenDelete] = useState(false);

 const toggleUpdate = () => {
  setOpenUpdate(!openUpdate);
 };

 const toggleDelete = () => {
  setOpenDelete(!openDelete);
 };

 useEffect(() => {
  const fetchUsers = async () => {
   const response = await fetch("/api/user");
   const data = await response.json();
   setUsers(data);
   setLoading(false);
  };

  fetchUsers();
 }, []);

 if (loading) {
  return <div>...Loading</div>;
 }

 return (
  <div className="overflow-x-auto">
   <table className="min-w-full border-collapse border border-gray-200">
    <thead>
     <tr className="bg-gray-500 text-white">
      <th className="border border-gray-200 p-2 w-[50px]">#</th>
      <th className="border border-gray-200 p-2 w-[200px]">Name</th>
      <th className="border border-gray-200 p-2">Email</th>
      <th className="border border-gray-200 p-2">Phone</th>
      <th className="border border-gray-200 p-2">Role</th>
      <th className="border border-gray-200 p-2">Options</th>
     </tr>
    </thead>
    <tbody>
     {users.map((user, index: number) => (
      <tr key={index}>
       <td className="border border-gray-200 p-2 text-center">{index + 1}</td>
       <td className="border border-gray-200 p-2">{user.fullname}</td>
       <td className="border border-gray-200 p-2">{user.email}</td>
       <td className="border border-gray-200 p-2 text-center">{user.phone}</td>
       <td className="border border-gray-200 p-2 text-center">{user.role}</td>
       <td className="border flex gap-2 items-center justify-center border-gray-200 p-2">
        <button onClick={toggleUpdate} className="py-2 px-4 bg-amber-300 rounded-[8px] cursor-pointer">
         <FaRegEdit />
        </button>
        {openUpdate && <UpdateUserModal onClose={toggleUpdate} />}
        <button
         onClick={toggleDelete}
         className="py-2 px-4 bg-red-600 rounded-[8px] cursor-pointer text-white">
         <IoMdTrash />
        </button>
        {openDelete && <DeleteUserModal onClose={toggleDelete} />}
       </td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 );
};

export default UserTable;
