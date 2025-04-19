"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminOrderList } from "@/components/admin-order-list"
import { AdminOrderDetail } from "@/components/admin-order-detail"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AdminOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null)

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
  }

  const handleBackToList = () => {
    setSelectedOrder(null)
  }

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <AdminSidebar activeTab="orders" />

        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold">
                {selectedOrder ? `Order #${selectedOrder.id} Details` : "Orders Management"}
              </h1>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {selectedOrder ? (
              <AdminOrderDetail order={selectedOrder} onBack={handleBackToList} />
            ) : (
              <AdminOrderList onViewOrder={handleViewOrder} />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
