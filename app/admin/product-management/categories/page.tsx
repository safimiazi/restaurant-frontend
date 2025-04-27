"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminCategoryList } from "@/components/admin-category-list"
import { AdminCategoryForm } from "@/components/admin-category-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AdminCategoriesPage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>()

  const handleAddNew = () => {
    setEditingCategory(null)
    setShowAddForm(true)
  }

  const handleEditCategory = (category : any) => {
    setEditingCategory(category)
    setShowAddForm(true)
  }

  const handleFormClose = () => {
    setShowAddForm(false)
    setEditingCategory(null)
  }

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <AdminSidebar activeTab="categories" />

        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-xl font-semibold">Categories Management</h1>
              <Button onClick={handleAddNew}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Category
              </Button>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {showAddForm ? (
              <AdminCategoryForm category={editingCategory} onClose={handleFormClose} />
            ) : (
          <AdminCategoryList onEditCategory={handleEditCategory} /> 
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
