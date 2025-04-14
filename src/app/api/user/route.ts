import { NextResponse } from "next/server";
import { retrieveData} from "@/lib/firebase/service";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/init";

export async function GET() {
    try {
        const users = await retrieveData("users");
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json({ status: 400, message: "Something went wrong" })
    }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const userRef = doc(db, 'users', id);
    await updateDoc(userRef, updateData);

    return NextResponse.json(
      { message: 'User updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      const body = await request.json();
      const idFromBody = body.id;
      if (!idFromBody) {
        return NextResponse.json(
          { error: 'User ID is required' },
          { status: 400 }
        );
      }
      await deleteDoc(doc(db, 'users', idFromBody));
      return NextResponse.json(
        { message: 'User deleted successfully' },
        { status: 200 }
      );
    }

    await deleteDoc(doc(db, 'users', id));

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}