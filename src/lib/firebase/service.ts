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
import app from "./init";
import bcrypt from "bcrypt";
import { stat } from "fs";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.data,
        ...doc.data()
    }));

    return data
}

export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data
}

export async function register(data: {
    fullname: string;
    email: string;
    phone: string
    password: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
}) {
    const q = query(
        collection(firestore, "users"),
        where("email", "==", data.email)
    )
    const snapshot = await getDocs(q)
    const users = snapshot.docs.map((doc) => ({
        id: doc.data,
        ...doc.data()
    }))
    if (users.length > 0) {
        return {
            status: false,
            statusCode: 400,
            message: "Email already exists"
        }
    } else {
        data.role = "Member"
        data.password = await bcrypt.hash(data.password, 10)
        data.created_at = new Date()
        data.updated_at = new Date()
        try {
            await addDoc(collection(firestore, "users"), data);
            return { status: true, statusCode: 200, message: "User registered successfully" }
        } catch (error) {
            return { status: false, statusCode: 500, message: "Something went wrong" }
        }
    }
}

export async function login(data: { email: string }) {
    const q = query(
        collection(firestore, "users"),
        where("email", "==", data.email)
    )
    const snapshot = await getDocs(q)
    const user = snapshot.docs.map((doc) => ({
        id: doc.data,
        ...doc.data()
    }))
    if (user) {
        return user[0]
    } else {
        return null
    }
}

export async function loginWithGoogle(data: any, callback: any) {
    const q = query(
        collection(firestore, "users"),
        where("email", "==", data.email)
    )
    const snapshot = await getDocs(q)
    const user: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))

    if (user.length > 0) {
        data.role = user[0].role;
        await updateDoc(doc(firestore, "users", user[0].id), data).then(() => {
            callback({ status: true, data: data })
        })
    } else {
        data.role = "member"
        await addDoc(collection(firestore, "users"), data).then(() => {
            callback({ status: true, data: data })
        })
    }
}