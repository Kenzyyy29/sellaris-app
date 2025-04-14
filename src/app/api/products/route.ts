import { NextResponse } from "next/server";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/init";

export async function GET() {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products: any[] = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const productData = await request.json();
        const docRef = await addDoc(collection(db, "products"), productData);
        return NextResponse.json(
            { id: docRef.id, ...productData },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to add product" },
            { status: 500 }
        );
    }
}