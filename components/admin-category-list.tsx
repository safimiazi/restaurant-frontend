"use client"

import { useEffect, useState } from "react"
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
import { useCategoryDeleteMutation, useGetAllCategoryQuery } from "@/redux/api/CategoryApi"
import { toast } from "react-toastify"

interface Category {
  _id: string
  name: string
  slug?: string
  image?: string | null
  description?: string
  isActive: boolean
  parentCategory: {
    name: string;
  }
  isDelete: boolean
  createdAt: string
  updatedAt: string
}

interface AdminCategoryListProps {
  onEditCategory: (category: Category) => void
}

export function AdminCategoryList({ onEditCategory }: AdminCategoryListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
const [categoryDelete] = useCategoryDeleteMutation()
  const { data: categoryData, isLoading } = useGetAllCategoryQuery({
    isDelete: false,
    search: debouncedSearchTerm,
    pageIndex: pageIndex - 1, // Converting to 0-based index if your API expects it
    pageSize,
  })


  useEffect(()=> {
const timerId = setTimeout(() => {
  setDebouncedSearchTerm(searchTerm);
  setPageIndex(1)
}, 500)


return () => {
  clearTimeout(timerId)
}
  },[searchTerm])

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category)
    setDeleteDialogOpen(true)
  }

  const confirmDelete =async () => {
   try {
    const res = await categoryDelete({id: categoryToDelete?._id}).unwrap()
    // For now, we'll just show a toast
    toast.success(`${res.message}`)
    setDeleteDialogOpen(false)
    setCategoryToDelete(null)
   } catch (error  : any) {
    toast.error(error?.data?.message || "Something went wrong!");
   }
  }

  const handlePageChange = (newPage: number) => {
    setPageIndex(newPage)
  }

  const renderStatus = (status: boolean) => (
    <span className={status ? "text-green-600" : "text-red-600"}>
      {status ? "Active" : "Inactive"}
    </span>
  )


  return (
    <div className="space-y-4">
      {/* Search and Page Size */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
            className="w-[200px] pl-8 md:w-[300px]"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setPageIndex(1)
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <span>Items per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setPageIndex(1)
            }}
            className="border rounded-md px-2 py-1"
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories Table */}
      <Card>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {[
                    "Image",
                    "Name",
                    "Slug",
                    "parentCategory",
                    "Status",
                    "Created At",
                    "Actions",
                  ].map((head) => (
                    <TableHead key={head}>{head}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading categories...
                    </TableCell>
                  </TableRow>
                ) : categoryData?.data?.result?.length ? (
                  categoryData.data.result.map((category: Category) => (
                    <TableRow key={category._id}>
                      <TableCell>
                        {category?.image ? (
                          <div className="h-10 w-10 rounded-md overflow-hidden">
                            <img
                              src={category?.image}
                              alt={category.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.slug || "-"}</TableCell>
                      <TableCell>{category.parentCategory?.name || "-"}</TableCell>
                      <TableCell>
                        {renderStatus(category.isActive)}
                      </TableCell>
                      <TableCell>
                        {new Date(category.createdAt).toLocaleDateString()}
                      </TableCell>
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
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteClick(category)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No categories found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          disabled={pageIndex === 1}
          onClick={() => handlePageChange(pageIndex - 1)}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {pageIndex} of {categoryData?.data?.meta?.totalPage || 1}
        </span>
        <Button
          variant="outline"
          disabled={pageIndex === categoryData?.data?.meta?.totalPage}
          onClick={() => handlePageChange(pageIndex + 1)}
        >
          Next
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the category "{categoryToDelete?.name}"? This action cannot be undone.
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