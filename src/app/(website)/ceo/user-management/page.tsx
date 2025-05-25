import type { Metadata } from "next";
import UsersList from "@/components/user-management/users-list";

export const metadata: Metadata = {
  title: "User Management | Orso Solutions",
  description: "Manage users",
};

export default function UserManagementPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">User management</h2>
        </div>

        <UsersList />
      </main>
    </div>
  );
}
