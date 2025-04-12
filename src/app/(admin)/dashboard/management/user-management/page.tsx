import UserTable from "@/components/layouts/Management/UserTable";

export default function UserManagementPage() {
 return (
  <div className="flex flex-col gap-4 ml-64">
   <h1 className="text-2xl font-bold">User Management</h1>
   <UserTable />
  </div>
 );
}
