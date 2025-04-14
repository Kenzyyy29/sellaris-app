"use client";

import {useState, useRef, ChangeEvent} from "react";
import {useProducts, type Product} from "@/hooks/useProducts";
import {useIngredients, type Ingredient} from "@/hooks/useIngredients";
import {FiPlus, FiX, FiTrash2, FiEdit, FiUpload} from "react-icons/fi";

interface AddProductFormProps {
 onClose: () => void;
 initialData?: Product | null;
}

const AddProductForm = ({onClose, initialData}: AddProductFormProps) => {
 const {addProduct, loading} = useProducts();
 const {ingredients, loading: ingredientsLoading} = useIngredients();
 const fileInputRef = useRef<HTMLInputElement>(null);

 const [formData, setFormData] = useState({
  name: initialData?.name || "",
  price: initialData?.price || 0,
  category: initialData?.category || "",
  description: initialData?.description || "",
  ingredients:
   initialData?.ingredients || ([] as {id: string; quantity: number}[]),
 });

 const [imageFile, setImageFile] = useState<File | null>(null);
 const [imagePreview, setImagePreview] = useState<string | null>(
  initialData?.imageUrl || null
 );
 const [selectedIngredient, setSelectedIngredient] = useState("");
 const [ingredientQuantity, setIngredientQuantity] = useState(0);

 const handleInputChange = (
  e: React.ChangeEvent<
   HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
 ) => {
  const {name, value} = e.target;
  setFormData({
   ...formData,
   [name]: name === "price" ? parseFloat(value) || 0 : value,
  });
 };

 const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
   const file = e.target.files[0];

   // Validate file type
   if (!file.type.match("image.(jpeg|jpg|png)")) {
    alert("Hanya file JPG/JPEG/PNG yang diperbolehkan");
    return;
   }

   // Validate file size (max 2MB)
   if (file.size > 2 * 1024 * 1024) {
    alert("Ukuran file maksimal 2MB");
    return;
   }

   setImageFile(file);

   // Create preview
   const reader = new FileReader();
   reader.onloadend = () => {
    setImagePreview(reader.result as string);
   };
   reader.readAsDataURL(file);
  }
 };

 const handleRemoveImage = () => {
  setImageFile(null);
  setImagePreview(null);
  if (fileInputRef.current) {
   fileInputRef.current.value = "";
  }
 };

 const handleAddIngredient = () => {
  if (!selectedIngredient || ingredientQuantity <= 0) return;

  const newIngredient = {
   id: selectedIngredient,
   quantity: ingredientQuantity,
  };

  setFormData({
   ...formData,
   ingredients: [...formData.ingredients, newIngredient],
  });

  setSelectedIngredient("");
  setIngredientQuantity(0);
 };

 const handleRemoveIngredient = (id: string) => {
  setFormData({
   ...formData,
   ingredients: formData.ingredients.filter((ing) => ing.id !== id),
  });
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
   const result = await addProduct(formData, imageFile || undefined);
   if (result.success) {
    alert("Produk berhasil ditambahkan!");
    onClose();
   } else {
    throw new Error("Gagal menambahkan produk");
   }
  } catch (error) {
   console.error("Error:", error);
   alert("Terjadi kesalahan saat menambahkan produk");
  }
 };

 if (ingredientsLoading) return <div>Loading bahan...</div>;

 return (
  <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
   <div className="p-6">
    <div className="flex justify-between items-center mb-4">
     <h2 className="text-xl font-semibold">
      {initialData ? "Edit Produk" : "Tambah Produk Baru"}
     </h2>
     <button
      onClick={onClose}
      className="text-gray-500 hover:text-gray-700">
      <FiX size={24} />
     </button>
    </div>

    <form onSubmit={handleSubmit}>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
       <label className="block text-gray-700 text-sm font-bold mb-2">
        Nama Produk*
       </label>
       <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
       />
      </div>

      <div>
       <label className="block text-gray-700 text-sm font-bold mb-2">
        Harga*
       </label>
       <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
        min="0"
       />
      </div>

      <div>
       <label className="block text-gray-700 text-sm font-bold mb-2">
        Kategori*
       </label>
       <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
       />
      </div>

      <div>
       <label className="block text-gray-700 text-sm font-bold mb-2">
        Gambar Produk
       </label>
       <div className="flex items-center gap-2">
        <label className="flex-1 cursor-pointer">
         <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/jpeg,image/png"
          className="hidden"
         />
         <div className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-center gap-2">
          <FiUpload />
          <span>{imageFile ? imageFile.name : "Pilih Gambar"}</span>
         </div>
        </label>
        {imagePreview && (
         <button
          type="button"
          onClick={handleRemoveImage}
          className="text-red-500 hover:text-red-700">
          <FiTrash2 />
         </button>
        )}
       </div>
       {imagePreview && (
        <div className="mt-2">
         <img
          src={imagePreview}
          alt="Preview"
          className="h-20 object-cover rounded"
         />
        </div>
       )}
       <p className="text-xs text-gray-500 mt-1">Format: JPG/PNG (max 2MB)</p>
      </div>
     </div>

     <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
       Deskripsi
      </label>
      <textarea
       name="description"
       value={formData.description}
       onChange={handleInputChange}
       className="w-full px-3 py-2 border border-gray-300 rounded-md"
       rows={3}
      />
     </div>

     <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Bahan Baku</h3>
      <div className="flex gap-2 mb-2">
       <select
        value={selectedIngredient}
        onChange={(e) => setSelectedIngredient(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md">
        <option value="">Pilih Bahan</option>
        {ingredients.map((ing) => (
         <option
          key={ing.id}
          value={ing.id}>
          {ing.name} ({ing.unit})
         </option>
        ))}
       </select>

       <input
        type="number"
        value={ingredientQuantity}
        onChange={(e) => setIngredientQuantity(parseFloat(e.target.value) || 0)}
        className="w-24 px-3 py-2 border border-gray-300 rounded-md"
        placeholder="Qty"
        min="0"
        step="0.01"
       />

       <button
        type="button"
        onClick={handleAddIngredient}
        className="bg-blue-500 text-white px-3 py-2 rounded-md">
        Tambah
       </button>
      </div>

      <div className="border rounded-md p-2">
       {formData.ingredients.length === 0 ? (
        <p className="text-gray-500 text-sm">
         Belum ada bahan yang ditambahkan
        </p>
       ) : (
        <ul className="divide-y divide-gray-200">
         {formData.ingredients.map((ing) => {
          const ingredient = ingredients.find((i) => i.id === ing.id);
          return (
           <li
            key={ing.id}
            className="py-2 flex justify-between items-center">
            <div>
             <span className="font-medium">{ingredient?.name}</span>
             <span className="text-gray-600 ml-2">
              {ing.quantity} {ingredient?.unit}
             </span>
            </div>
            <button
             type="button"
             onClick={() => handleRemoveIngredient(ing.id)}
             className="text-red-500 hover:text-red-700">
             <FiX />
            </button>
           </li>
          );
         })}
        </ul>
       )}
      </div>
     </div>

     <div className="flex justify-end space-x-3">
      <button
       type="button"
       onClick={onClose}
       className="px-4 py-2 text-gray-600 hover:text-gray-800">
       Batal
      </button>
      <button
       type="submit"
       disabled={loading}
       className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 flex items-center gap-2">
       {loading ? (
        <>
         <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
           className="opacity-25"
           cx="12"
           cy="12"
           r="10"
           stroke="currentColor"
           strokeWidth="4"></circle>
          <path
           className="opacity-75"
           fill="currentColor"
           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
         </svg>
         Menyimpan...
        </>
       ) : (
        "Simpan Produk"
       )}
      </button>
     </div>
    </form>
   </div>
  </div>
 );
};

export default AddProductForm;
