"use client";

import {useState} from "react";
import {useIngredients, type Ingredient} from "@/hooks/useIngredients";
import {FiPlus, FiEdit, FiTrash2} from "react-icons/fi";

const IngredientsPage = () => {
 const {
  ingredients,
  loading,
  addIngredient,
  updateIngredient,
  deleteIngredient,
 } = useIngredients();
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(
  null
 );
 const [formData, setFormData] = useState({
  name: "",
  category: "",
  quantity: 0,
  unit: "gr",
 });

 const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
 ) => {
  const {name, value} = e.target;
  setFormData({
   ...formData,
   [name]: name === "quantity" ? parseFloat(value) || 0 : value,
  });
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (currentIngredient?.id) {
   await updateIngredient(currentIngredient.id, formData);
  } else {
   await addIngredient(formData);
  }
  setIsModalOpen(false);
  resetForm();
 };

 const handleEdit = (ingredient: Ingredient) => {
  setCurrentIngredient(ingredient);
  setFormData({
   name: ingredient.name,
   category: ingredient.category,
   quantity: ingredient.quantity,
   unit: ingredient.unit,
  });
  setIsModalOpen(true);
 };

 const handleDelete = async (id: string) => {
  if (confirm("Are you sure you want to delete this ingredient?")) {
   await deleteIngredient(id);
  }
 };

 const resetForm = () => {
  setFormData({
   name: "",
   category: "",
   quantity: 0,
   unit: "gr",
  });
  setCurrentIngredient(null);
 };

 if (loading) return <div>Loading...</div>;

 return (
  <div className="ml-64">
   <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">Bahan Baku</h1>
    <button
     onClick={() => setIsModalOpen(true)}
     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center">
     <FiPlus className="mr-2" /> Tambah Bahan
    </button>
   </div>

   <div className="bg-white rounded-lg shadow overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
     <thead className="bg-gray-50">
      <tr>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        #
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Nama
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Kategori
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Jumlah
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Satuan
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Actions
       </th>
      </tr>
     </thead>
     <tbody className="bg-white divide-y divide-gray-200">
      {ingredients.length === 0 ? (
       <tr>
        <td
         colSpan={5}
         className="px-6 py-4 text-center text-gray-500">
         Tidak ada data bahan baku
        </td>
       </tr>
      ) : (
       ingredients.map((ingredient, index: number) => (
        <tr key={ingredient.id}>
         <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
         <td className="px-6 py-4 whitespace-nowrap">{ingredient.name}</td>
         <td className="px-6 py-4 whitespace-nowrap">{ingredient.category}</td>
         <td className="px-6 py-4 whitespace-nowrap">{ingredient.quantity}</td>
         <td className="px-6 py-4 whitespace-nowrap">{ingredient.unit}</td>
         <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
          <button
           onClick={() => handleEdit(ingredient)}
           className="bg-blue-500 hover:bg-blue-700 text-white px-4 cursor-pointer py-2 rounded w-full flex items-center justify-center">
           <FiEdit />
          </button>
          <button
           onClick={() => handleDelete(ingredient.id!)}
           className="bg-red-500 hover:bg-red-700 text-white px-4 cursor-pointer py-2 rounded w-full     flex items-center justify-center">
           <FiTrash2 />
          </button>
         </td>
        </tr>
       ))
      )}
     </tbody>
    </table>
   </div>

   {/* Modal */}
   {isModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
     <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div className="p-6">
       <h2 className="text-xl font-semibold mb-4">
        {currentIngredient ? "Edit Bahan" : "Tambah Bahan Baru"}
       </h2>
       <form onSubmit={handleSubmit}>
        <div className="mb-4">
         <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name">
          Nama Bahan
         </label>
         <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
         />
        </div>
        <div className="mb-4">
         <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="category">
          Kategori
         </label>
         <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
         />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
         <div>
          <label
           className="block text-gray-700 text-sm font-bold mb-2"
           htmlFor="quantity">
           Jumlah
          </label>
          <input
           type="number"
           id="quantity"
           name="quantity"
           value={formData.quantity}
           onChange={handleInputChange}
           className="w-full px-3 py-2 border border-gray-300 rounded-md"
           required
           min="0"
           step="0.01"
          />
         </div>
         <div>
          <label
           className="block text-gray-700 text-sm font-bold mb-2"
           htmlFor="unit">
           Satuan
          </label>
          <select
           id="unit"
           name="unit"
           value={formData.unit}
           onChange={handleInputChange}
           className="w-full px-3 py-2 border border-gray-300 rounded-md"
           required>
           <option value="gr">Gram (gr)</option>
           <option value="ml">Mililiter (ml)</option>
           <option value="kg">Kilogram (kg)</option>
           <option value="l">Liter (l)</option>
           <option value="pcs">Pieces (pcs)</option>
          </select>
         </div>
        </div>
        <div className="flex justify-end space-x-3">
         <button
          type="button"
          onClick={() => {
           setIsModalOpen(false);
           resetForm();
          }}
          className="px-4 py-2 text-gray-600 hover:text-gray-800">
          Batal
         </button>
         <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Simpan
         </button>
        </div>
       </form>
      </div>
     </div>
    </div>
   )}
  </div>
 );
};

export default IngredientsPage;
