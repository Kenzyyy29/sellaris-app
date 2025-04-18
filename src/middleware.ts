import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(request: NextRequest) {
    const response = NextResponse.next();

    // Tambahkan header security jika diperlukan
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");

    return response;
}

const protectedRoutes = [
    "/dashboard",
    "/admin",
    "/admin/*",
    "/member",
    "/member/*",
];

export default withAuth(mainMiddleware, protectedRoutes);