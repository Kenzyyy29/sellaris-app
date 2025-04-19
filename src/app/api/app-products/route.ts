// /api/app-products/route.ts

import {NextResponse} from "next/server";
import {collection, addDoc, getDocs, doc, updateDoc} from "firebase/firestore";
import {db} from "@/lib/firebase/init";

export async function GET() {
 try {
  const querySnapshot = await getDocs(collection(db, "appProducts"));
  const packages: any[] = [];
  querySnapshot.forEach((doc) => {
   packages.push({id: doc.id, ...doc.data()});
  });
  return NextResponse.json(packages);
 } catch (error) {
  return NextResponse.json(
   {error: "Failed to fetch subscription packages"},
   {status: 500}
  );
 }
}

// /api/app-products/route.ts
// Pastikan semua endpoint menggunakan field price bukan pricePercentage

export async function POST(request: Request) {
  try {
    const productData = await request.json();
    // Pastikan data yang dikirim menggunakan price bukan pricePercentage
    const docRef = await addDoc(collection(db, "appProducts"), {
      ...productData,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return NextResponse.json(
      { id: docRef.id, ...productData },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add subscription package" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
 try {
  const {id, ...updateData} = await request.json();
  await updateDoc(doc(db, "appProducts", id), {
   ...updateData,
   updated_at: new Date(),
  });
  return NextResponse.json(
   {message: "Package updated successfully"},
   {status: 200}
  );
 } catch (error) {
  return NextResponse.json(
   {error: "Failed to update subscription package"},
   {status: 500}
  );
 }
}
