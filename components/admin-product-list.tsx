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
import { useProductGetAllQuery } from "@/redux/api/ProductApi"

interface AdminProductListProps {
  onEditProduct: (product: any) => void
}

export function AdminProductList({ onEditProduct }: AdminProductListProps) {
  const [loading, setLoading] = useState(true)
  const [pageIndex, setPageIndex] = useState(1); // Start from page 1
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(5);  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
 const {data: products}  = useProductGetAllQuery({
  isDelete: false,
  search: "",
  pageIndex: pageIndex - 1, // Adjust for 0-based index
  pageSize,
 })


  return (
 <div>

 </div>
  )
}
