import UserTable from "@/components/layouts/Management/UserTable";

export default function ClientPage() {
 return (
  <div className="flex flex-col gap-4">
   <h1 className="text-2xl font-bold">Client Management</h1>
   <UserTable />
  </div>
 );
}
