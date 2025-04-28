"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Edit, Trash, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProductGetAllQuery } from "@/redux/api/ProductApi"

interface AdminProductListProps {
  onEditProduct: (product: any) => void
}

export function AdminProductList({ onEditProduct }: AdminProductListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<any>(null)

  const { data: response, isLoading } = useProductGetAllQuery({
    isDelete: false,
    search: searchTerm,
    pageIndex: pageIndex - 1,
    pageSize,
  })

  const products = response?.data?.result || []
  const meta = response?.data?.meta || { total: 0, totalPage: 1 }

  const handleDeleteClick = (product: any) => {
    setProductToDelete(product)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setDeleteDialogOpen(false)
    setProductToDelete(null)
  }

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-500">Active</Badge>
    ) : (
      <Badge variant="outline">Inactive</Badge>
    )
  }

  const categories = ["all"]
  products.forEach((product: any) => {
    if (product.category && !categories.includes(product.category.name)) {
      categories.push(product.category.name)
    }
  })

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
              <SelectItem value="inactive">Inactive</SelectItem>
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
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Variants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    Loading products...
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product: any) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div className="h-10 w-10 rounded-md overflow-hidden">
                        <img
                          src={product.thumbnail || "/placeholder.svg"}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      {product?.category?.name || "N/A"}
                      {product?.subcategories?.length > 0 && (
                        <span className="text-xs text-muted-foreground ml-1">
                          ({product.subcategories.length} subcategories)
                        </span>
                      )}
                    </TableCell>
                    <TableCell>${product.price?.toFixed(2) || "0.00"}</TableCell>
                    <TableCell>{product.discount || 0}%</TableCell>
                    <TableCell>{product.stock || 0}</TableCell>
                    <TableCell className="flex flex-col gap-1">
                      {product?.variant?.map((variant: any, inx : number) => (
                        <Badge key={inx} variant="secondary" className="w-fit">
                          {variant.name} ({variant.attributeOption?.length || 0})
                        </Badge>
                      ))}
                    </TableCell>
                    <TableCell>{getStatusBadge(product.isActive)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => onEditProduct(product)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(product)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
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
    </div>
  )
}
