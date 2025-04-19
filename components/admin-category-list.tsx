"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Edit, Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AdminCategoryListProps {
  onEditCategory: (category: any) => void
}

export function AdminCategoryList({ onEditCategory }: AdminCategoryListProps) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)

  useEffect(() => {
    // In a real app, this would fetch categories from the backend
    // Simulate API call
    setTimeout(() => {
      setCategories([
        {
          id: "1",
          name: "Fast Food",
          image: "/placeholder.svg?height=200&width=200",
          productCount: 12,
        },
        {
          id: "2",
          name: "Desserts",
          image: "/placeholder.svg?height=200&width=200",
          productCount: 8,
        },
        {
          id: "3",
          name: "Drinks",
          image: "/placeholder.svg?height=200&width=200",
          productCount: 10,
        },
        {
          id: "4",
          name: "Main Course",
          image: "/placeholder.svg?height=200&width=200",
          productCount: 15,
        },
        {
          id: "5",
          name: "Appetizers",
          image: "/placeholder.svg?height=200&width=200",
          productCount: 7,
        },
        {
          id: "6",
          name: "Salads",
          image: "/placeholder.svg?height=200&width=200",
          productCount: 5,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the category
    setCategories(categories.filter((c) => c.id !== categoryToDelete.id))
    setDeleteDialogOpen(false)
    setCategoryToDelete(null)
  }

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
            className="w-[200px] pl-8 md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Loading categories...
                  </TableCell>
                </TableRow>
              ) : filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    No categories found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="h-10 w-10 rounded-md overflow-hidden">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.productCount} products</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => onEditCategory(category)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit category
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(category)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete category
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the category "{categoryToDelete?.name}"? This action cannot be undone.
              {categoryToDelete?.productCount > 0 && (
                <p className="mt-2 text-destructive">
                  Warning: This category contains {categoryToDelete.productCount} products. Deleting it may affect these
                  products.
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
