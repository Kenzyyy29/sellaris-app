import { useState, useEffect } from "react";
import {
    collection,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/init";

export interface Ingredient {
    id?: string;
    name: string;
    category: string;
    quantity: number;
    unit: string;
}

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchIngredients = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "ingredients"));
            const ingredientsData: Ingredient[] = [];
            querySnapshot.forEach((doc) => {
                ingredientsData.push({ id: doc.id, ...doc.data() } as Ingredient);
            });
            setIngredients(ingredientsData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching ingredients:", error);
            setLoading(false);
        }
    };

    const addIngredient = async (ingredient: Omit<Ingredient, 'id'>) => {
        try {
            const docRef = await addDoc(collection(db, "ingredients"), ingredient);
            setIngredients([...ingredients, { id: docRef.id, ...ingredient }]);
            return true;
        } catch (error) {
            console.error("Error adding ingredient:", error);
            return false;
        }
    };

    const updateIngredient = async (id: string, data: Partial<Ingredient>) => {
        try {
            await updateDoc(doc(db, "ingredients", id), data);
            setIngredients(
                ingredients.map((ing) => (ing.id === id ? { ...ing, ...data } : ing))
            );
            return true;
        } catch (error) {
            console.error("Error updating ingredient:", error);
            return false;
        }
    };

    const deleteIngredient = async (id: string) => {
        try {
            await deleteDoc(doc(db, "ingredients", id));
            setIngredients(ingredients.filter((ing) => ing.id !== id));
            return true;
        } catch (error) {
            console.error("Error deleting ingredient:", error);
            return false;
        }
    };

    useEffect(() => {
        fetchIngredients();
    }, []);

    return {
        ingredients,
        loading,
        addIngredient,
        updateIngredient,
        deleteIngredient,
        fetchIngredients,
    };
};