import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase/init";

export interface Product {
    id?: string;
    name: string;
    price: number;
    category: string;
    description: string;
    ingredients: {
        id: string;
        quantity: number;
    }[];
    imageUrl?: string;
}

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData: Product[] = [];
            querySnapshot.forEach((doc) => {
                productsData.push({ id: doc.id, ...doc.data() } as Product);
            });
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const uploadImage = async (file: File): Promise<string> => {
        try {
            const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    };

    const addProduct = async (product: Omit<Product, 'id'>, imageFile?: File) => {
        try {
            setLoading(true);

            let imageUrl = "";
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const productData = {
                ...product,
                ...(imageUrl && { imageUrl })
            };

            const docRef = await addDoc(collection(db, "products"), productData);
            setProducts([...products, { id: docRef.id, ...productData }]);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error("Error adding product:", error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            setLoading(true);
            await deleteDoc(doc(db, "products", id));
            setProducts(products.filter(product => product.id !== id));
            return { success: true };
        } catch (error) {
            console.error("Error deleting product:", error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, loading, addProduct, deleteProduct, fetchProducts, uploadImage };
};