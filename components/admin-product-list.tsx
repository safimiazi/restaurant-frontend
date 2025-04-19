"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Edit, Trash, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AdminProductListProps {
  onEditProduct: (product: any) => void
}

export function AdminProductList({ onEditProduct }: AdminProductListProps) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  useEffect(() => {
    // In a real app, this would fetch products from the backend
    // Simulate API call
    setTimeout(() => {
      setProducts([
        {
          id: "1",
          name: "Chicken Burger",
          category: "Fast Food",
          categoryId: "1",
          price: 8.99,
          stock: 50,
          status: "active",
          variants: [
            { id: "1-1", name: "Classic Chicken Burger", price: 8.99 },
            { id: "1-2", name: "Spicy Chicken Burger", price: 9.49 },
            { id: "1-3", name: "Cheese Chicken Burger", price: 9.99 },
          ],
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: "2",
          name: "Chocolate Cake",
          category: "Desserts",
          categoryId: "2",
          price: 6.99,
          stock: 25,
          status: "active",
          variants: [
            { id: "2-1", name: "Single Slice", price: 6.99 },
            { id: "2-2", name: "Double Slice", price: 12.99 },
            { id: "2-3", name: "Whole Cake (8 slices)", price: 49.99 },
          ],
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: "3",
          name: "Pepperoni Pizza",
          category: "Fast Food",
          categoryId: "1",
          price: 12.99,
          stock: 30,
          status: "active",
          variants: [
            { id: "3-1", name: 'Small (8")', price: 12.99 },
            { id: "3-2", name: 'Medium (12")', price: 16.99 },
            { id: "3-3", name: 'Large (16")', price: 20.99 },
          ],
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: "4",
          name: "Strawberry Milkshake",
          category: "Drinks",
          categoryId: "3",
          price: 4.99,
          stock: 40,
          status: "active",
          variants: [
            { id: "4-1", name: "Small", price: 4.99 },
            { id: "4-2", name: "Medium", price: 5.99 },
            { id: "4-3", name: "Large", price: 6.99 },
          ],
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: "5",
          name: "Chicken Wings",
          category: "Fast Food",
          categoryId: "1",
          price: 9.99,
          stock: 35,
          status: "active",
          variants: [
            { id: "5-1", name: "6 pieces", price: 9.99 },
            { id: "5-2", name: "12 pieces", price: 18.99 },
            { id: "5-3", name: "18 pieces", price: 26.99 },
          ],
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: "6",
          name: "French Fries",
          category: "Fast Food",
          categoryId: "1",
          price: 3.99,
          stock: 60,
          status: "active",
          variants: [
            { id: "6-1", name: "Small", price: 3.99 },
            { id: "6-2", name: "Medium", price: 4.99 },
            { id: "6-3", name: "Large", price: 5.99 },
          ],
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: "7",
          name: "Ice Cream Sundae",
          category: "Desserts",
          categoryId: "2",
          price: 5.99,
          stock: 0,
          status: "out_of_stock",
          variants: [
            { id: "7-1", name: "Vanilla", price: 5.99 },
            { id: "7-2", name: "Chocolate", price: 5.99 },
            { id: "7-3", name: "Strawberry", price: 5.99 },
          ],
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: "8",
          name: "Cheesecake",
          category: "Desserts",
          categoryId: "2",
          price: 7.99,
          stock: 15,
          status: "active",
          variants: [
            { id: "8-1", name: "Single Slice", price: 7.99 },
            { id: "8-2", name: "Whole Cake", price: 59.99 },
          ],
          image: "/placeholder.svg?height=200&width=200",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleDeleteClick = (product) => {
    setProductToDelete(product)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the product
    setProducts(products.filter((p) => p.id !== productToDelete.id))
    setDeleteDialogOpen(false)
    setProductToDelete(null)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "out_of_stock":
        return <Badge variant="secondary">Out of Stock</Badge>
      case "discontinued":
        return <Badge variant="outline">Discontinued</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Filter products based on search term and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Get unique categories for filter
  const categories = ["all", ...new Set(products.map((product) => product.category))]

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-[200px] pl-8 md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              <SelectItem value="discontinued">Discontinued</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Variants</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    Loading products...
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="h-10 w-10 rounded-md overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.variants.length} variants</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
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
                          <DropdownMenuItem onClick={() => onEditProduct(product)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit product
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(product)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete product
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
              Are you sure you want to delete the product "{productToDelete?.name}"? This action cannot be undone.
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
