import { NextResponse } from "next/server";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/init";

export async function GET() {
    try {
        const querySnapshot = await getDocs(collection(db, "ingredients"));
        const ingredients: any[] = [];
        querySnapshot.forEach((doc) => {
            ingredients.push({ id: doc.id, ...doc.data() });
        });
        return NextResponse.json(ingredients);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch ingredients" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const docRef = await addDoc(collection(db, "ingredients"), data);
        return NextResponse.json({ id: docRef.id, ...data }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to add ingredient" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const { id, ...data } = await request.json();
        if (!id) {
            return NextResponse.json(
                { error: "Ingredient ID is required" },
                { status: 400 }
            );
        }
        await updateDoc(doc(db, "ingredients", id), data);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update ingredient" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        if (!id) {
            return NextResponse.json(
                { error: "Ingredient ID is required" },
                { status: 400 }
            );
        }
        await deleteDoc(doc(db, "ingredients", id));
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete ingredient" },
            { status: 500 }
        );
    }
}