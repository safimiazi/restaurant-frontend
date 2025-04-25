"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminBrandForm } from "@/components/admin-brand-form"
import { AdminBrandList } from "@/components/admin-brand-list"

export default function AdminBrandPage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingBrand, setEditingBrand] = useState(null)

  const handleAddNew = () => {
    setEditingBrand(null)
    setShowAddForm(true)
  }

  const handleEditBrand = (brand: any) => {
    setEditingBrand(brand)
    setShowAddForm(true)
  }

  const handleFormClose = () => {
    setShowAddForm(false)
    setEditingBrand(null)
  }

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <AdminSidebar activeTab="brands" />
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-xl font-semibold">Brand Management</h1>
              <Button onClick={handleAddNew}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Brand
              </Button>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {showAddForm ? (
              <AdminBrandForm brand={editingBrand} onClose={handleFormClose} />
            ) : (
              <AdminBrandList onEditBrand={handleEditBrand} />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
