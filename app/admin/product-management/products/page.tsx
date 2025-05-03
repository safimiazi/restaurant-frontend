"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminProductList } from "@/components/admin-product-list";
import { AdminProductForm } from "@/components/admin-product-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminProductsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowAddForm(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingProduct(null);
  };

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <AdminSidebar activeTab="products" />

        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-xl font-semibold">Products Management</h1>
              <Button onClick={handleAddNew}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Product shafi
              </Button>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {showAddForm ? (
              <AdminProductForm
                product={editingProduct}
                onClose={handleFormClose}
              />
            ) : (
              <AdminProductList onEditProduct={handleEditProduct} />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
