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
import { MoreHorizontal, Search, Filter } from "lucide-react"

export function AdminCustomers() {
  // Sample customers data
  const customers = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      orders: 12,
      spent: 349.45,
      rewardPoints: 250,
      status: "active",
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
    },
  ]

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search customers..." className="w-[200px] pl-8 md:w-[300px]" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
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
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Reward Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
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
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>View orders</DropdownMenuItem>
                        <DropdownMenuItem>Edit customer</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Add reward points</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Block customer</DropdownMenuItem>
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
