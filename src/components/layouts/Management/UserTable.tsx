"use client";
import React, {useState, useEffect} from "react";
import {FaRegEdit} from "react-icons/fa";
import {IoMdTrash} from "react-icons/io";

interface User {
 id: string;
 fullname: string;
 email: string;
 phone: string;
 role: string;
}

const DeleteUser: React.FC<{onClose: () => void}> = ({onClose}) => {
 return (
  <div className="fixed flex items-center justify-center w-full h-full top-0 left-0 bg-black/50">
   <div className="bg-white w-full max-w-md p-4 h-auto rounded-[8px] flex flex-col gap-4">
    {/* Tittle*/}
    <h1 className="text-xl font-bold">
     Are You Sure want to delete this user?
    </h1>
    <p>This actions need Admin Permisions</p>
    <hr />
    <div className="flex gap-3 items-center justify-end">
     <button
      onClick={onClose}
      className="px-4 py-2 rounded-[8px] bg-amber-400 text-white cursor-pointer">
      Cancel
     </button>
     <button className="px-4 py-2 rounded-[8px] bg-red-500 text-white cursor-pointer">
      Delete
     </button>
    </div>
   </div>
  </div>
 );
};

const UserTable: React.FC = () => {
 const [users, setUsers] = useState<User[]>([]);
 const [loading, setLoading] = useState(true);
 const [onOpen, setOnOpen] = useState(false);

 const toggleDelete = () => {
  setOnOpen(!onOpen);
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
        <button className="py-2 px-4 bg-amber-300 rounded-[8px] cursor-pointer">
         <FaRegEdit />
        </button>
        <button
         onClick={toggleDelete}
         className="py-2 px-4 bg-red-600 rounded-[8px] cursor-pointer text-white">
         <IoMdTrash />
        </button>
        {onOpen && <DeleteUser onClose={toggleDelete} />}
       </td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 );
};

export default UserTable;
