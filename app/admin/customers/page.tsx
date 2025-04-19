"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminCustomerList } from "@/components/admin-customer-list"
import { AdminCustomerDetail } from "@/components/admin-customer-detail"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AdminCustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer)
  }

  const handleBackToList = () => {
    setSelectedCustomer(null)
  }

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <AdminSidebar activeTab="customers" />

        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold">
                {selectedCustomer ? `${selectedCustomer.name}'s Profile` : "Customers Management"}
              </h1>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {selectedCustomer ? (
              <AdminCustomerDetail customer={selectedCustomer} onBack={handleBackToList} />
            ) : (
              <AdminCustomerList onViewCustomer={handleViewCustomer} />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
