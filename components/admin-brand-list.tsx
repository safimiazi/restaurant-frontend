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
import { useGetAllBrandQuery } from "@/redux/api/BrandApi";
import { toast } from "react-toastify";

interface Brand {
  id: number;
  brandName: string;
  brandImage: string;
  brandDescription?: string;
}

interface AdminBrandListProps {
  onEditBrand: (brand: Brand) => void;
}

export function AdminBrandList({ onEditBrand }: AdminBrandListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(1); // Start from page 1
  const [pageSize, setPageSize] = useState(5); // Default page size is 5

  const { data: brandsData } = useGetAllBrandQuery({
    isDelete: false,
    search: searchTerm,
    pageIndex: pageIndex - 1, // Adjust for 0-based index
    pageSize,
  });

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      // delete logic here
      toast.success("Brand deleted successfully!");
    } else {
      toast.info("Delete cancelled.");
    }
  };

  const handleEdit = (brand: Brand) => {
    onEditBrand(brand);
  };

  const totalPages = brandsData?.data?.totalPage || 1; // Update this to match the correct pagination info

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search brand..."
              className="w-[200px] pl-8 md:w-[300px]"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPageIndex(1); // reset page on search
              }}
            />
          </div>
        </div>
        {/* Page Size Dropdown */}
        <div className="flex items-center gap-2">
          <span>Items per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageIndex(1); // Reset to page 1 when page size changes
            }}
            className="border rounded-md px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Brand Table */}
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brandsData?.data?.result?.map((brand: Brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <img
                      src={brand.brandImage || "/placeholder.svg"}
                      alt={brand.brandName}
                      className="h-10 w-10 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>{brand.brandName}</TableCell>
                  <TableCell>{brand.brandDescription}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEdit(brand)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit brand
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(brand.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete brand
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {brandsData?.data?.result?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No brands found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
    Page {pageIndex} of {brandsData?.data?.meta?.totalPage}
  </span>
  <Button
    variant="outline"
    disabled={pageIndex === brandsData?.data?.meta?.totalPage}
    onClick={() => setPageIndex((prev) => prev + 1)}
  >
    Next
  </Button>
</div>

    </div>
  );
}
