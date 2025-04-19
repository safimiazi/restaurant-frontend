"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EmployeeDashboard } from "@/components/employee-dashboard"
import { SidebarProvider } from "@/components/ui/sidebar"
import { EmployeeSidebar } from "@/components/employee-sidebar"

export default function EmployeePage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <EmployeeSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center justify-end space-x-4">
              <div className="w-full flex-1 md:w-auto md:flex-none">
                <div className="relative">
                  <Input placeholder="Search..." className="w-full md:w-[300px] pl-8" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Store
              </Button>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {activeTab === "dashboard" && <EmployeeDashboard />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
