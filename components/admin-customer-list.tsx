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
import { MoreHorizontal, Search, Eye, Gift, Ban, Award } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AdminCustomerListProps {
  onViewCustomer: (customer: any) => void
}

export function AdminCustomerList({ onViewCustomer }: AdminCustomerListProps) {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("orders")
  const [addPointsDialog, setAddPointsDialog] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [pointsToAdd, setPointsToAdd] = useState(0)

  useEffect(() => {
    // In a real app, this would fetch customers from the backend
    // Simulate API call
    setTimeout(() => {
      setCustomers([
        {
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
          orders: 12,
          spent: 349.45,
          rewardPoints: 250,
          status: "active",
          joinDate: "2023-06-15",
          lastOrder: "2024-04-15",
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah.johnson@example.com",
          phone: "+1 (555) 234-5678",
          orders: 8,
          spent: 245.99,
          rewardPoints: 180,
          status: "active",
          joinDate: "2023-08-22",
          lastOrder: "2024-04-10",
        },
        {
          id: "3",
          name: "Michael Smith",
          email: "michael.smith@example.com",
          phone: "+1 (555) 345-6789",
          orders: 7,
          spent: 199.5,
          rewardPoints: 150,
          status: "active",
          joinDate: "2023-09-05",
          lastOrder: "2024-04-05",
        },
        {
          id: "4",
          name: "Emily Davis",
          email: "emily.davis@example.com",
          phone: "+1 (555) 456-7890",
          orders: 5,
          spent: 175.25,
          rewardPoints: 120,
          status: "active",
          joinDate: "2023-10-18",
          lastOrder: "2024-04-01",
        },
        {
          id: "5",
          name: "Robert Wilson",
          email: "robert.wilson@example.com",
          phone: "+1 (555) 567-8901",
          orders: 4,
          spent: 135.75,
          rewardPoints: 90,
          status: "inactive",
          joinDate: "2023-11-30",
          lastOrder: "2024-03-28",
        },
        {
          id: "6",
          name: "Jennifer Brown",
          email: "jennifer.brown@example.com",
          phone: "+1 (555) 678-9012",
          orders: 3,
          spent: 89.97,
          rewardPoints: 60,
          status: "active",
          joinDate: "2024-01-12",
          lastOrder: "2024-03-25",
        },
        {
          id: "7",
          name: "David Miller",
          email: "david.miller@example.com",
          phone: "+1 (555) 789-0123",
          orders: 9,
          spent: 275.45,
          rewardPoints: 200,
          status: "active",
          joinDate: "2023-07-08",
          lastOrder: "2024-03-22",
        },
        {
          id: "8",
          name: "Lisa Anderson",
          email: "lisa.anderson@example.com",
          phone: "+1 (555) 890-1234",
          orders: 6,
          spent: 185.75,
          rewardPoints: 130,
          status: "blocked",
          joinDate: "2023-08-15",
          lastOrder: "2024-02-18",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "blocked":
        return <Badge variant="destructive">Blocked</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleAddPoints = (customer) => {
    setSelectedCustomer(customer)
    setPointsToAdd(0)
    setAddPointsDialog(true)
  }

  const confirmAddPoints = () => {
    // In a real app, this would call an API to add points to the customer
    const updatedCustomers = customers.map((customer) => {
      if (customer.id === selectedCustomer.id) {
        return {
          ...customer,
          rewardPoints: customer.rewardPoints + Number.parseInt(pointsToAdd),
        }
      }
      return customer
    })

    setCustomers(updatedCustomers)
    setAddPointsDialog(false)
    setSelectedCustomer(null)
  }

  // Filter customers based on search term and filters
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || customer.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortBy === "orders") {
      return b.orders - a.orders
    } else if (sortBy === "spent") {
      return b.spent - a.spent
    } else if (sortBy === "points") {
      return b.rewardPoints - a.rewardPoints
    } else if (sortBy === "recent") {
      return new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime()
    } else {
      return 0
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
              placeholder="Search customers..."
              className="w-[200px] pl-8 md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="orders">Most Orders</SelectItem>
              <SelectItem value="spent">Highest Spending</SelectItem>
              <SelectItem value="points">Most Reward Points</SelectItem>
              <SelectItem value="recent">Recent Orders</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Reward Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Loading customers...
                  </TableCell>
                </TableRow>
              ) : sortedCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                sortedCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs">{customer.email}</span>
                        <span className="text-xs text-muted-foreground">{customer.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>${customer.spent.toFixed(2)}</TableCell>
                    <TableCell>{customer.rewardPoints}</TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
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
                          <DropdownMenuItem onClick={() => onViewCustomer(customer)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAddPoints(customer)}>
                            <Gift className="mr-2 h-4 w-4" />
                            Add reward points
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {customer.status !== "blocked" ? (
                            <DropdownMenuItem className="text-destructive">
                              <Ban className="mr-2 h-4 w-4" />
                              Block customer
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <Award className="mr-2 h-4 w-4" />
                              Unblock customer
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

      <Dialog open={addPointsDialog} onOpenChange={setAddPointsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Reward Points</DialogTitle>
            <DialogDescription>Add reward points to {selectedCustomer?.name}'s account.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="points" className="text-sm font-medium">
                Points to Add
              </label>
              <Input
                id="points"
                type="number"
                min="0"
                value={pointsToAdd}
                onChange={(e) => setPointsToAdd(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">Current points: {selectedCustomer?.rewardPoints || 0}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddPointsDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAddPoints} disabled={!pointsToAdd || pointsToAdd <= 0}>
              Add Points
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
