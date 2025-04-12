export default function AuthLayout({children}: {children: React.ReactNode}) {
 return (
  <div className="flex items-center justify-center w-full min-h-screen py-10 bg-gradient-to-br from-slate-500 to-slate-800">
   {children}
  </div>
 );
}
