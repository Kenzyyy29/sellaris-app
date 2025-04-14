import {useState, useEffect} from "react";
import {
 collection,
 getDocs,
 doc,
 deleteDoc,
 updateDoc,
} from "firebase/firestore";
import {db} from "@/lib/firebase/init";

interface User {
 id: string;
 fullname: string;
 email: string;
 phone: string;
 role: string;
}

export const useUsers = () => {
 const [users, setUsers] = useState<User[]>([]);
 const [loading, setLoading] = useState(true);

 const fetchUsers = async () => {
  try {
   const querySnapshot = await getDocs(collection(db, "users"));
   const usersData: User[] = [];
   querySnapshot.forEach((doc) => {
    usersData.push({id: doc.id, ...doc.data()} as User);
   });
   setUsers(usersData);
   setLoading(false);
  } catch (error) {
   console.error("Error fetching users:", error);
   setLoading(false);
  }
 };

 const deleteUser = async (userId: string) => {
  try {
   await deleteDoc(doc(db, "users", userId));
   setUsers(users.filter((user) => user.id !== userId));
   return true;
  } catch (error) {
   console.error("Error deleting user:", error);
   return false;
  }
 };

 const updateUser = async (userId: string, data: Partial<User>) => {
  try {
   const userRef = doc(db, "users", userId);
   await updateDoc(userRef, data);
   setUsers(
    users.map((user) => (user.id === userId ? {...user, ...data} : user))
   );
   return true;
  } catch (error) {
   console.error("Error updating user:", error);
   return false;
  }
 };

 useEffect(() => {
  fetchUsers();
 }, []);

 return {users, loading, deleteUser, updateUser, fetchUsers};
};
