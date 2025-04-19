import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { app } from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))

    return data
}

export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data()
    return data
}

// /lib/firebase/service.ts
export async function register(data: {
    fullname: string;
    email: string;
    phone: string;
    password: string;
    companyAddress?: string;
    companyType?: string;
    monthlyRevenue?: string;
    agreeToTerms?: boolean;
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
        id: doc.id,
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
            return { status: false, statusCode: 500, message: "Something went wrong" };
        }
    }
}

export async function login(data: { email: string }) {
    const q = query(
        collection(firestore, "users"),
        where("email", "==", data.email)
    );
    const snapshot = await getDocs(q);
    const user = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    if (user) {
        return user[0];
    } else {
        return null;
    }
}

// /lib/firebase/service.ts

// Add these functions to your existing service file

export async function addAppProduct(data: {
  name: string;
  description: string;
  duration: number; // in months
  pricePercentage: number; // percentage of sales
  features: string[];
  isActive: boolean;
  created_at?: Date;
  updated_at?: Date;
}) {
  try {
    data.created_at = new Date();
    data.updated_at = new Date();
    const docRef = await addDoc(collection(firestore, "appProducts"), data);
    return {
      status: true,
      statusCode: 200,
      message: "Package added successfully",
      id: docRef.id,
    };
  } catch (error) {
    return { status: false, statusCode: 500, message: "Failed to add package" };
  }
}

export async function retrieveAppProducts() {
  const snapshot = await getDocs(collection(firestore, "appProducts"));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveAppProductById(id: string) {
  const snapshot = await getDoc(doc(firestore, "appProducts", id));
  const data = snapshot.data();
  return data;
}

export async function updateAppProduct(
  id: string,
  data: Partial<{
    name: string;
    description: string;
    duration: number;
    pricePercentage: number;
    features: string[];
    isActive: boolean;
    updated_at?: Date;
  }>
) {
  try {
    data.updated_at = new Date();
    await updateDoc(doc(firestore, "appProducts", id), data);
    return {
      status: true,
      statusCode: 200,
      message: "Package updated successfully",
    };
  } catch (error) {
    return { status: false, statusCode: 500, message: "Failed to update package" };
  }
}

// /lib/firebase/service.ts
export async function createUserSubscription(data: {
  userId: string;
  packageId: string;
  packageName: string;
  price: number;
  duration: number;
  startDate: Date;
  endDate: Date;
  status?: 'active' | 'expired' | 'canceled';
  paymentStatus?: 'pending' | 'paid' | 'failed';
}) {
  try {
    const subscriptionData = {
      ...data,
      status: data.status || 'active',
      paymentStatus: data.paymentStatus || 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(firestore, "userSubscriptions"), subscriptionData);
    return {
      status: true,
      statusCode: 200,
      message: "Subscription created successfully",
      id: docRef.id,
    };
  } catch (error) {
    return { status: false, statusCode: 500, message: "Failed to create subscription" };
  }
}

export async function getUserSubscriptions(userId: string) {
 const q = query(
  collection(firestore, "userSubscriptions"),
  where("userId", "==", userId)
 );
 const snapshot = await getDocs(q);
 const data = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
 }));
 return data;
}

export async function cancelUserSubscription(subscriptionId: string) {
 try {
  await updateDoc(doc(firestore, "userSubscriptions", subscriptionId), {
   status: "canceled",
   updatedAt: new Date(),
  });
  return {
   status: true,
   statusCode: 200,
   message: "Subscription canceled successfully",
  };
 } catch (error) {
  return {
   status: false,
   statusCode: 500,
   message: "Failed to cancel subscription",
  };
 }
}