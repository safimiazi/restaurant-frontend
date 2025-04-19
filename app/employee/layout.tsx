import type React from "react"
import { EmployeeSidebar } from "@/components/employee-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function EmployeeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <div className="flex-1 p-6">{children}</div>
      </SidebarProvider>
    </div>
  )
}
