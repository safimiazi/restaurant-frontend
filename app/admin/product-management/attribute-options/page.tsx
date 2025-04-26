"use client";
import AdminAttributeOptionForm from '@/components/admin-attribute-option-form';
import { AdminAttributeOptionList } from '@/components/admin-attribute-option-list';
import { AdminSidebar } from '@/components/admin-sidebar';
import { Button } from '@/components/ui/button';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';

const AttributeOptions = () => {
    const [showAddForm, setShowAddForm] = useState(false)
    const [editing, setEditing] = useState(null)
  
    const handleAddNew = () => {
      setEditing(null)
      setShowAddForm(true)
    }
  
    const handleEdit = (item: any) => {
      setEditing(item)
      setShowAddForm(true)
    }
  
    const handleFormClose = () => {
      setShowAddForm(false)
      setEditing(null)
    }
    return (
        <SidebarProvider>
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <AdminSidebar activeTab="attributes" />
          <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-xl font-semibold">Attribute Option Management</h1>
              <Button onClick={handleAddNew}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Attribute Option
              </Button>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {showAddForm ? (
              <AdminAttributeOptionForm editingData={editing} onClose={handleFormClose} />
            ) : (
              <AdminAttributeOptionList onEdit={handleEdit} />
            )}
          </main>
        </div>
        </div>
      </SidebarProvider>
    );
};

export default AttributeOptions;