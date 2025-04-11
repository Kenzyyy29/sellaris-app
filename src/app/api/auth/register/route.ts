import { register } from "@/lib/firebase/service"
import { NextResponse, NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    const req = await request.json()
    const res = await register(req)
    return NextResponse.json(
        { status: res.status, statusCode: res.statusCode, message: res.message },
    )
}