"use client"
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
import { MoreHorizontal, Search, Filter, Plus } from "lucide-react"

export function AdminProducts() {
  // Sample products data
  const products = [
    {
      id: "1",
      name: "Chicken Burger",
      category: "Fast Food",
      price: 8.99,
      stock: 50,
      status: "active",
    },
    {
      id: "2",
      name: "Chocolate Cake",
      category: "Desserts",
      price: 6.99,
      stock: 25,
      status: "active",
    },
    {
      id: "3",
      name: "Pepperoni Pizza",
      category: "Fast Food",
      price: 12.99,
      stock: 30,
      status: "active",
    },
    {
      id: "4",
      name: "Strawberry Milkshake",
      category: "Drinks",
      price: 4.99,
      stock: 40,
      status: "active",
    },
    {
      id: "5",
      name: "Chicken Wings",
      category: "Fast Food",
      price: 9.99,
      stock: 35,
      status: "active",
    },
    {
      id: "6",
      name: "French Fries",
      category: "Fast Food",
      price: 3.99,
      stock: 60,
      status: "active",
    },
    {
      id: "7",
      name: "Ice Cream Sundae",
      category: "Desserts",
      price: 5.99,
      stock: 20,
      status: "out_of_stock",
    },
    {
      id: "8",
      name: "Cheesecake",
      category: "Desserts",
      price: 7.99,
      stock: 15,
      status: "active",
    },
  ]

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="w-[200px] pl-8 md:w-[300px]" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
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
                        <DropdownMenuItem>Edit product</DropdownMenuItem>
                        <DropdownMenuItem>Update stock</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete product</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
