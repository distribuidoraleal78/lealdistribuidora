import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Segunda camada de proteção, além do middleware.
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-ink-900">
      <AdminSidebar userEmail={user.email ?? ""} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
