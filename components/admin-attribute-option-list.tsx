import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, MoreHorizontal, Search, Trash } from "lucide-react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { toast } from "react-toastify";
import {
  useProductAttributeOptionDeleteMutation,
  useProductAttributeOptionGetAllQuery,
} from "@/redux/api/ProductAttributeOptionApi";

interface AttributeOption {
  _id: string;
  name: string;
  price: number;
  image?: string | null;
  description?: string;
  value?: string;
  slug?: string;
  isActive: boolean;
  isDelete: boolean;
}

interface ListProps {
  onEdit: (attributeOption: AttributeOption) => void;
}

export function AdminAttributeOptionList({ onEdit }: ListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [productAttributeOptionDelete] =
    useProductAttributeOptionDeleteMutation();
  const { data: attributeOptionsData } = useProductAttributeOptionGetAllQuery({
    isDelete: false,
    search: debouncedSearchTerm,
    pageIndex: pageIndex - 1,
    pageSize,
  });

     useEffect(()=> {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPageIndex(1)
    }, 500)
    
    
    return () => {
      clearTimeout(timerId)
    }
      },[searchTerm])

  const handleDelete = async (id: string) => {
    try {
      const res = await productAttributeOptionDelete({ id }).unwrap();
      toast.success(res?.message || "Attribute option deleted successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  const handleEdit = (attributeOption: AttributeOption) => {
    onEdit(attributeOption);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search attribute option..."
              className="w-[200px] pl-8 md:w-[300px]"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPageIndex(1);
              }}
            />
          </div>
        </div>
        {/* Page Size */}
        <div className="flex items-center gap-2">
          <span>Items per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageIndex(1);
            }}
            className="border rounded-md px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Attribute Option Table */}
      <Card>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[1000px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Delete Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attributeOptionsData?.data?.result?.map(
                  (option: AttributeOption) => (
                    <TableRow key={option._id}>
                      <TableCell>
                        {option.image ? (
                          <img
                            src={option?.image || "/placeholder.png"}
                            alt={option.name}
                            className="h-10 w-10 object-cover rounded-md"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-200 flex items-center justify-center rounded-md text-xs text-gray-500">
                            No Image
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{option.name}</TableCell>
                      <TableCell>{option.price}</TableCell>
                      <TableCell>{option.description || "-"}</TableCell>
                      <TableCell>{option.value || "-"}</TableCell>
                      <TableCell>{option.slug || "-"}</TableCell>
                      <TableCell>
                        {option.isActive ? (
                          <span className="text-green-600">Active</span>
                        ) : (
                          <span className="text-red-600">Inactive</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {option.isDelete ? (
                          <span className="text-red-600">Deleted</span>
                        ) : (
                          <span className="text-green-600">Available</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => handleEdit(option)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit option
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(option._id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete option
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                )}
                {attributeOptionsData?.data?.result?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center">
                      No attribute options found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          disabled={pageIndex === 1}
          onClick={() => setPageIndex((prev) => prev - 1)}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {pageIndex} of {attributeOptionsData?.data?.meta?.totalPage}
        </span>
        <Button
          variant="outline"
          disabled={pageIndex === attributeOptionsData?.data?.meta?.totalPage}
          onClick={() => setPageIndex((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
