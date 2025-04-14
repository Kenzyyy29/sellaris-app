"use client";

import {useState, useEffect} from "react";

interface UpdateUserModalProps {
 isOpen: boolean;
 onClose: () => void;
 onSave: (data: {role: string}) => void;
 userData: {
  fullname: string;
  email: string;
  phone: string;
  role: string;
 };
}

const UpdateUserModal = ({
 isOpen,
 onClose,
 onSave,
 userData,
}: UpdateUserModalProps) => {
 const [formData, setFormData] = useState(userData);

 useEffect(() => {
  setFormData(userData);
 }, [userData]);

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
 ) => {
  const {name, value} = e.target;
  setFormData((prev) => ({...prev, [name]: value}));
 };

 if (!isOpen) return null;
 return (
  <div className="fixed flex items-center justify-center w-full h-full top-0 left-0 bg-black/30">
   <div className="bg-white w-full max-w-md p-4 h-auto rounded-[8px] flex flex-col gap-4">
    {/* Tittle*/}
    <h1 className="text-xl font-bold">
     Update User Info ({formData.fullname})
    </h1>
    <form className="space-y-4">
     <input
      type="text"
      name="fullname"
      disabled
      value={formData.fullname}
      className="w-full border border-gray-400 text-gray-400 focus:outline-none rounded px-3 py-2"
     />

     <input
      type="email"
      name="email"
      disabled
      value={formData.email}
      className="w-full border border-gray-400 text-gray-400 focus:outline-none rounded px-3 py-2"
     />

     <input
      type="tel"
      name="phone"
      disabled
      value={formData.phone}
      className="w-full border border-gray-400 text-gray-400 focus:outline-none rounded px-3 py-2"
     />

     <select
      name="role"
      value={formData.role}
      onChange={handleChange}
      className="w-full border border-black text-black focus:outline-none rounded px-3 py-2">
      <option value="member">member</option>
      <option value="admin">admin</option>
     </select>
    </form>
    <hr />
    <div className="flex gap-3 items-center justify-end">
     <button
      onClick={onClose}
      className="px-4 py-2 rounded-[8px] bg-amber-400 text-white cursor-pointer">
      Cancel
     </button>
     <button
      onClick={() => onSave(formData)}
      className="px-4 py-2 rounded-[8px] bg-red-500 text-white cursor-pointer">
      Save
     </button>
    </div>
   </div>
  </div>
 );
};

export default UpdateUserModal;
