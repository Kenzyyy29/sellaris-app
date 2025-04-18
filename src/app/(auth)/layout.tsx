import Link from "next/link";

export default function AuthLayout({children}: {children: React.ReactNode}) {
 return (
  <div className="flex items-center justify-center w-full min-h-screen py-10 bg-[#f4f4f4]">
   <header className="fixed top-0 z-10 p-5 px-10 flex items-center w-full">
    <nav className="flex justify-between items-center w-full">
     <Link href="/"><h1 className="text-3xl font-bold italic">SELLARIS</h1></Link>
     <Link href="/contact">Contact Us</Link>
    </nav>
   </header>
   {children}
  </div>
 );
}
