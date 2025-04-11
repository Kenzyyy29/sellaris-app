export default function AuthLayout({children}: {children: React.ReactNode}) {
 return (
  <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-slate-500 to-slate-800">
   {children}
  </div>
 );
}
