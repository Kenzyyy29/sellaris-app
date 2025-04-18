import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export default function withAuth(
    middleware: NextMiddleware,
    requireAuth: string[] = []
) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (pathname === "/admin") {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }

        if (pathname === "/member") {
            return NextResponse.redirect(new URL("/member/dashboard", req.url));
        }

        // Route yang memerlukan autentikasi
        const isProtectedRoute = requireAuth.some(route =>
            pathname.startsWith(route) ||
            pathname === route.replace(/\/\*$/, '')
        );

        // Route auth pages
        const isAuthPage = ["/sign-in", "/sign-up"].includes(pathname);

        if (isProtectedRoute) {
            if (!token) {
                const url = new URL("/sign-in", req.url);
                url.searchParams.set("callbackUrl", encodeURI(pathname));
                return NextResponse.redirect(url);
            }

            // Validasi role untuk admin routes
            if (pathname.startsWith("/admin") && token.role !== "admin") {
                return NextResponse.redirect(new URL("/", req.url));
            }

            // Validasi role untuk member routes
            if (pathname.startsWith("/member") && token.role !== "member") {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        // Jika sudah login tapi mengakses halaman auth
        if (isAuthPage && token) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return middleware(req, next);
    };
}