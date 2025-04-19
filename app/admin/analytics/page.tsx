"use client"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminAnalytics } from "@/components/admin-analytics"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AdminAnalyticsPage() {
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <AdminSidebar activeTab="analytics" />

        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold">Analytics</h1>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <AdminAnalytics />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
