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
import { MoreHorizontal, Search, Eye, CheckCircle, XCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AdminOrderListProps {
  onViewOrder: (order: any) => void
}

export function AdminOrderList({ onViewOrder }: AdminOrderListProps) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [updateStatusDialog, setUpdateStatusDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [newStatus, setNewStatus] = useState("")

  useEffect(() => {
    // In a real app, this would fetch orders from the backend
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: "ORD-1234",
          customer: "John Doe",
          customerPhone: "+1 (555) 123-4567",
          date: "2024-04-15",
          status: "delivered",
          total: 32.97,
          paymentMethod: "Cash on Delivery",
          paymentStatus: "paid",
          items: [
            { id: "1", name: "Chicken Burger", quantity: 2, price: 8.99, variant: "Classic" },
            { id: "4", name: "Strawberry Milkshake", quantity: 1, price: 4.99, variant: "Medium" },
            { id: "6", name: "French Fries", quantity: 2, price: 3.99, variant: "Large" },
          ],
          address: "123 Main St, New York, NY 10001",
          notes: "Please deliver to the front door.",
        },
        {
          id: "ORD-1233",
          customer: "Sarah Johnson",
          customerPhone: "+1 (555) 234-5678",
          date: "2024-04-10",
          status: "delivered",
          total: 26.98,
          paymentMethod: "Online Payment",
          paymentStatus: "paid",
          items: [
            { id: "3", name: "Pepperoni Pizza", quantity: 1, price: 12.99, variant: "Medium" },
            { id: "9", name: "Iced Coffee", quantity: 2, price: 3.99, variant: "Large" },
            { id: "6", name: "French Fries", quantity: 1, price: 3.99, variant: "Medium" },
          ],
          address: "456 Elm St, Brooklyn, NY 11201",
          notes: "",
        },
        {
          id: "ORD-1232",
          customer: "Michael Smith",
          customerPhone: "+1 (555) 345-6789",
          date: "2024-04-05",
          status: "delivered",
          total: 19.98,
          paymentMethod: "Cash on Delivery",
          paymentStatus: "paid",
          items: [
            { id: "1", name: "Chicken Burger", quantity: 1, price: 8.99, variant: "Spicy" },
            { id: "2", name: "Chocolate Cake", quantity: 1, price: 6.99, variant: "Single Slice" },
            { id: "4", name: "Strawberry Milkshake", quantity: 1, price: 4.99, variant: "Small" },
          ],
          address: "789 Oak St, Queens, NY 11354",
          notes: "Call when arriving.",
        },
        {
          id: "ORD-1231",
          customer: "Emily Davis",
          customerPhone: "+1 (555) 456-7890",
          date: "2024-04-01",
          status: "processing",
          total: 42.97,
          paymentMethod: "Manual Payment",
          paymentStatus: "pending",
          items: [
            { id: "11", name: "Grilled Salmon", quantity: 1, price: 16.99, variant: "Regular" },
            { id: "12", name: "Steak", quantity: 1, price: 19.99, variant: "Medium Rare" },
            { id: "10", name: "Fresh Orange Juice", quantity: 1, price: 4.49, variant: "Large" },
          ],
          address: "321 Pine St, Manhattan, NY 10002",
          notes: "",
        },
        {
          id: "ORD-1230",
          customer: "Robert Wilson",
          customerPhone: "+1 (555) 567-8901",
          date: "2024-03-28",
          status: "pending",
          total: 35.5,
          paymentMethod: "Manual Payment",
          paymentStatus: "pending",
          items: [
            { id: "3", name: "Pepperoni Pizza", quantity: 2, price: 12.99, variant: "Large" },
            { id: "7", name: "Ice Cream Sundae", quantity: 1, price: 5.99, variant: "Chocolate" },
            { id: "9", name: "Iced Coffee", quantity: 1, price: 3.99, variant: "Medium" },
          ],
          address: "654 Maple St, Bronx, NY 10451",
          notes: "Leave at the door.",
        },
        {
          id: "ORD-1229",
          customer: "Jennifer Brown",
          customerPhone: "+1 (555) 678-9012",
          date: "2024-03-25",
          status: "cancelled",
          total: 29.99,
          paymentMethod: "Online Payment",
          paymentStatus: "refunded",
          items: [
            { id: "5", name: "Chicken Wings", quantity: 2, price: 9.99, variant: "12 pieces" },
            { id: "10", name: "Fresh Orange Juice", quantity: 2, price: 4.49, variant: "Medium" },
          ],
          address: "987 Cedar St, Staten Island, NY 10301",
          notes: "Customer requested cancellation.",
        },
        {
          id: "ORD-1228",
          customer: "David Miller",
          customerPhone: "+1 (555) 789-0123",
          date: "2024-03-22",
          status: "delivered",
          total: 45.75,
          paymentMethod: "Cash on Delivery",
          paymentStatus: "paid",
          items: [
            { id: "12", name: "Steak", quantity: 2, price: 19.99, variant: "Well Done" },
            { id: "6", name: "French Fries", quantity: 1, price: 3.99, variant: "Large" },
            { id: "4", name: "Strawberry Milkshake", quantity: 1, price: 4.99, variant: "Large" },
          ],
          address: "159 Birch St, Brooklyn, NY 11217",
          notes: "",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>
      case "processing":
        return <Badge className="bg-blue-500">Processing</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "refunded":
        return <Badge variant="secondary">Refunded</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleUpdateStatus = (order, status) => {
    setSelectedOrder(order)
    setNewStatus(status)
    setUpdateStatusDialog(true)
  }

  const confirmUpdateStatus = () => {
    // In a real app, this would call an API to update the order status
    const updatedOrders = orders.map((order) => {
      if (order.id === selectedOrder.id) {
        return { ...order, status: newStatus }
      }
      return order
    })

    setOrders(updatedOrders)
    setUpdateStatusDialog(false)
    setSelectedOrder(null)
  }

  // Filter orders based on search term and filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesPayment =
      paymentFilter === "all" || order.paymentMethod.toLowerCase().includes(paymentFilter.toLowerCase())

    let matchesDate = true
    if (dateFilter !== "all") {
      const orderDate = new Date(order.date)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      if (dateFilter === "today") {
        matchesDate = orderDate.toDateString() === today.toDateString()
      } else if (dateFilter === "yesterday") {
        matchesDate = orderDate.toDateString() === yesterday.toDateString()
      } else if (dateFilter === "this-week") {
        const weekStart = new Date(today)
        weekStart.setDate(today.getDate() - today.getDay())
        matchesDate = orderDate >= weekStart
      } else if (dateFilter === "this-month") {
        matchesDate = orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear()
      }
    }

    return matchesSearch && matchesStatus && matchesPayment && matchesDate
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="w-[200px] pl-8 md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="cash">Cash on Delivery</SelectItem>
              <SelectItem value="online">Online Payment</SelectItem>
              <SelectItem value="manual">Manual Payment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setStatusFilter}>
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={statusFilter} className="space-y-4 pt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        Loading orders...
                      </TableCell>
                    </TableRow>
                  ) : filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        No orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div>{order.customer}</div>
                            <div className="text-sm text-muted-foreground">{order.customerPhone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(order.date)}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>{order.paymentMethod}</TableCell>
                        <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
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
                              <DropdownMenuItem onClick={() => onViewOrder(order)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                              {order.status !== "pending" && (
                                <DropdownMenuItem onClick={() => handleUpdateStatus(order, "pending")}>
                                  Mark as Pending
                                </DropdownMenuItem>
                              )}
                              {order.status !== "processing" && (
                                <DropdownMenuItem onClick={() => handleUpdateStatus(order, "processing")}>
                                  Mark as Processing
                                </DropdownMenuItem>
                              )}
                              {order.status !== "delivered" && (
                                <DropdownMenuItem onClick={() => handleUpdateStatus(order, "delivered")}>
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                  Mark as Delivered
                                </DropdownMenuItem>
                              )}
                              {order.status !== "cancelled" && (
                                <DropdownMenuItem onClick={() => handleUpdateStatus(order, "cancelled")}>
                                  <XCircle className="mr-2 h-4 w-4 text-destructive" />
                                  Cancel Order
                                </DropdownMenuItem>
                              )}
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
        </TabsContent>
      </Tabs>

      <Dialog open={updateStatusDialog} onOpenChange={setUpdateStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Are you sure you want to change the status of order #{selectedOrder?.id} to {newStatus}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateStatusDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmUpdateStatus}>
              {newStatus === "delivered"
                ? "Mark as Delivered"
                : newStatus === "cancelled"
                  ? "Cancel Order"
                  : `Mark as ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
