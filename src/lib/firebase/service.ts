import {
 addDoc,
 collection,
 deleteDoc,
 doc,
 getDoc,
 getDocs,
 getFirestore,
 query,
 updateDoc,
 where,
} from "firebase/firestore";
import {app} from "./init";
import bcrypt, {compare} from "bcryptjs";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
 const snapshot = await getDocs(collection(firestore, collectionName));
 return snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
 }));
}

export async function retrieveDataById(collectionName: string, id: string) {
 const snapshot = await getDoc(doc(firestore, collectionName, id));
 if (!snapshot.exists()) return null;
 return {id: snapshot.id, ...snapshot.data()};
}

export async function register(data: {
 fullname: string;
 email: string;
 phone: string;
 password: string;
 role?: string;
 created_at?: Date;
 updated_at?: Date;
}) {
 const q = query(
  collection(firestore, "users"),
  where("email", "==", data.email)
 );
 const snapshot = await getDocs(q);
 const users = snapshot.docs.map((doc) => ({
  id: doc.data,
  ...doc.data(),
 }));
 if (users.length > 0) {
  return {
   status: false,
   statusCode: 400,
   message: "Email already exists",
  };
 } else {
  data.role = "member";
  data.password = await bcrypt.hash(data.password, 10);
  data.created_at = new Date();
  data.updated_at = new Date();
  try {
   await addDoc(collection(firestore, "users"), data);
   return {
    status: true,
    statusCode: 200,
    message: "User registered successfully",
   };
  } catch (error) {
   return {status: false, statusCode: 500, message: "Something went wrong"};
  }
 }
}

export async function login(data: {email: string}) {
 const q = query(
  collection(firestore, "users"),
  where("email", "==", data.email)
 );
 const snapshot = await getDocs(q);
 const user = snapshot.docs.map((doc) => ({
  id: doc.data,
  ...doc.data(),
 }));
 if (user) {
  return user[0];
 } else {
  return null;
 }
}

export async function getAdminUsers(): Promise<any[]> {
 const q = query(collection(firestore, "users"), where("role", "==", "admin"));
 const snapshot = await getDocs(q);
 return snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
 }));
}

export async function updateAdminProfile(
 userId: string,
 updateData: {
  fullname?: string;
  phone?: string;
  password?: string;
 },
 currentPassword?: string
): Promise<{success: boolean; message: string}> {
 try {
  // Jika ingin mengubah password
  if (updateData.password && currentPassword) {
   const userDoc = await getDoc(doc(firestore, "users", userId));
   const userData = userDoc.data();

   if (!userData) {
    return {success: false, message: "User not found"};
   }

   // Verifikasi password lama
   const isPasswordValid = await compare(currentPassword, userData.password);
   if (!isPasswordValid) {
    return {success: false, message: "Current password is incorrect"};
   }

   // Hash password baru
   updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  await updateDoc(doc(firestore, "users", userId), {
   ...updateData,
   updated_at: new Date(),
  });

  return {success: true, message: "Profile updated successfully"};
 } catch (error) {
  console.error("Error updating admin profile:", error);
  return {success: false, message: "Failed to update profile"};
 }
}

export async function deleteUser(userId: string): Promise<boolean> {
 try {
  await deleteDoc(doc(firestore, "users", userId));
  return true;
 } catch (error) {
  console.error("Error deleting user:", error);
  return false;
 }
}
