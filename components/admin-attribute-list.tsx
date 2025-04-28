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
import { useProductAttributeOptionDeleteMutation } from "@/redux/api/ProductAttributeOptionApi";
import { useProductAttributeGetAllQuery } from "@/redux/api/ProductAttributeApi";
import { Tooltip } from "recharts";

interface Attribute {
  _id: string;
  name: string;
  price: number;
  image?: string | null;
  description?: string;
  attributeOption: {
    price: number;
    name: string;
    image?: string | null;
    description?: string;
    isActive: boolean;
    isDelete: boolean;
    _id: string;
  }[];
  value?: string;
  slug?: string;
  isActive: boolean;
  isDelete: boolean;
}

interface ListProps {
  onEdit: (attributeOption: Attribute) => void;
}

export function AdminAttributeList({ onEdit }: ListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [deleteAttributeOption] = useProductAttributeOptionDeleteMutation();
  const { data: attributeData } = useProductAttributeGetAllQuery({
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
      const res = await deleteAttributeOption({ id }).unwrap();
      toast.success(res?.message || "Attribute option deleted successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  const handlePageChange = (newPage: number) => {
    setPageIndex(newPage);
  };

  const renderStatus = (
    status: boolean,
    activeLabel: string,
    inactiveLabel: string
  ) => (
    <span className={status ? "text-green-600" : "text-red-600"}>
      {status ? activeLabel : inactiveLabel}
    </span>
  );

  return (
    <div className="space-y-4">
      {/* Search and Page Size */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search attribute..."
            className="w-[200px] pl-8 md:w-[300px]"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPageIndex(1);
            }}
          />
        </div>
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
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Attribute Options Table */}
      <Card>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[1000px]">
              <TableHeader>
                <TableRow>
                  {[
                    "Name",
                    "Description",
                    "Value",
                    "Slug",
                    "Active",
                    "Delete Status",
                    "Attribute Options", // <-- Added this new heading
                    "Actions",
                  ].map((head) => (
                    <TableHead key={head}>{head}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {attributeData?.data?.result?.length ? (
                  attributeData.data.result.map((option: Attribute) => (
                    <TableRow key={option._id}>
                      <TableCell>{option.name}</TableCell>
                      <TableCell>{option.description || "-"}</TableCell>
                      <TableCell>{option.value || "-"}</TableCell>
                      <TableCell>{option.slug || "-"}</TableCell>
                      <TableCell>
                        {renderStatus(option.isActive, "Active", "Inactive")}
                      </TableCell>
                      <TableCell>
                        {renderStatus(!option.isDelete, "Available", "Deleted")}
                      </TableCell>

                      {/* NEW CELL: Attribute Option Names */}
                      <TableCell className="flex flex-wrap gap-2">
                        {option.attributeOption?.length
                          ? option.attributeOption.map((opt) => (
                            <div
                              key={opt._id}
                              title={`Price: ${opt.price}`}
                              className={`px-2 py-1 rounded-full text-center text-white text-xs transition-all duration-500 ${
                                opt.isActive ? "bg-green-500" : "bg-gray-400"
                              }`}
                            >
                              {opt.name}
                            </div>
                            ))
                          : "-"}
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
                            <DropdownMenuItem onClick={() => onEdit(option)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(option._id)}
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
                    <TableCell colSpan={8} className="text-center">
                      No attribute options found.
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
          Page {pageIndex} of {attributeData?.data?.meta?.totalPage || 1}
        </span>
        <Button
          variant="outline"
          disabled={pageIndex === attributeData?.data?.meta?.totalPage}
          onClick={() => handlePageChange(pageIndex + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
