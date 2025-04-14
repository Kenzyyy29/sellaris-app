"use client";

import {useState} from "react";
import {useProducts, type Product} from "@/hooks/useProducts";
import {FiPlus, FiEdit, FiTrash2} from "react-icons/fi";
import AddProductForm from "@/components/ui/AddProductForm";

const ProductsPage = () => {
 const {products, loading, deleteProduct} = useProducts();
 const [isFormOpen, setIsFormOpen] = useState(false);
 const [productToEdit, setProductToEdit] = useState<Product | null>(null);

 const handleDelete = async (id: string) => {
  if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
   await deleteProduct(id);
  }
 };

 const handleEdit = (product: Product) => {
  setProductToEdit(product);
  setIsFormOpen(true);
 };

 const handleCloseForm = () => {
  setIsFormOpen(false);
  setProductToEdit(null);
 };

 if (loading)
  return (
   <div className="flex justify-center items-center h-64">Loading...</div>
  );

 return (
  <div className="ml-64">
   <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">Manajemen Produk</h1>
    <button
     onClick={() => setIsFormOpen(true)}
     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
     <FiPlus /> Tambah Produk
    </button>
   </div>

   <div className="bg-white rounded-lg shadow overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
     <thead className="bg-gray-50">
      <tr>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Gambar
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Nama
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Harga
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Kategori
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Aksi
       </th>
      </tr>
     </thead>
     <tbody className="bg-white divide-y divide-gray-200">
      {products.length === 0 ? (
       <tr>
        <td
         colSpan={5}
         className="px-6 py-4 text-center text-gray-500">
         Tidak ada produk
        </td>
       </tr>
      ) : (
       products.map((product) => (
        <tr
         key={product.id}
         className="hover:bg-gray-50">
         <td className="px-6 py-4 whitespace-nowrap">
          {product.imageUrl ? (
           <img
            src={product.imageUrl}
            alt={product.name}
            className="h-10 w-10 rounded-full object-cover"
           />
          ) : (
           <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-xs">No Image</span>
           </div>
          )}
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <div className="font-medium text-gray-900">{product.name}</div>
          <div className="text-gray-500 text-sm line-clamp-2">
           {product.description}
          </div>
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          {new Intl.NumberFormat("id-ID", {
           style: "currency",
           currency: "IDR",
           minimumFractionDigits: 0,
          }).format(product.price)}
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
           {product.category}
          </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex gap-2">
           <button
            onClick={() => handleEdit(product)}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 cursor-pointer py-2 rounded w-full flex items-center justify-center">
            <FiEdit />
           </button>
           <button
            onClick={() => product.id && handleDelete(product.id)}
            className="bg-red-500 hover:bg-red-700 text-white px-4 cursor-pointer py-2 rounded w-full     flex items-center justify-center">
            <FiTrash2 />
           </button>
          </div>
         </td>
        </tr>
       ))
      )}
     </tbody>
    </table>
   </div>

   {/* Modal Form */}
   {isFormOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
     <AddProductForm
      onClose={handleCloseForm}
      initialData={productToEdit}
     />
    </div>
   )}
  </div>
 );
};

export default ProductsPage;
