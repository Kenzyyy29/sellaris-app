import { NextResponse } from "next/server";
import { retrieveData} from "@/lib/firebase/service";

export async function GET() {
    try {
        const users = await retrieveData("users");
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json({ status: 400, message: "Something went wrong" })
    }
}