// /app/api/auth/register/route.ts
import {register} from "@/lib/firebase/service";
import {NextResponse, NextRequest} from "next/server";

export async function POST(request: NextRequest) {
 const req = await request.json();

 // Validasi password di server
 if (req.password.length < 8) {
  return NextResponse.json({
   status: false,
   statusCode: 400,
   message: "Password must be at least 8 characters",
  });
 }

 if (!/[0-9]/.test(req.password)) {
  return NextResponse.json({
   status: false,
   statusCode: 400,
   message: "Password must contain a number",
  });
 }

 if (!/[!@#$%^&*(),.?":{}|<>]/.test(req.password)) {
  return NextResponse.json({
   status: false,
   statusCode: 400,
   message: "Password must contain a symbol",
  });
 }

 const res = await register(req);
 return NextResponse.json({
  status: res.status,
  statusCode: res.statusCode,
  message: res.message,
 });
}
