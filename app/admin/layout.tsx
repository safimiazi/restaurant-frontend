import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminProtect from "@/hooks/AdminProtect";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminProtect>
      <div className="flex min-h-screen">
        <SidebarProvider>
          <div className="flex-1 p-6">{children}</div>
        </SidebarProvider>
      </div>
    </AdminProtect>
  );
}
