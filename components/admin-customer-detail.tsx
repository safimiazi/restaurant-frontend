"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Gift, Ban, Award, ShoppingBag, Mail, Phone } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AdminCustomerDetailProps {
  customer: any
  onBack: () => void
}

export function AdminCustomerDetail({ customer, onBack }: AdminCustomerDetailProps) {
  const [currentCustomer, setCurrentCustomer] = useState(customer)
  const [addPointsDialog, setAddPointsDialog] = useState(false)
  const [pointsToAdd, setPointsToAdd] = useState(0)
  const [blockDialog, setBlockDialog] = useState(false)
  const [blockReason, setBlockReason] = useState("")

  // Mock order history
  const orderHistory = [
    {
      id: "ORD-1234",
      date: "2024-04-15",
      status: "delivered",
      total: 32.97,
      items: 5,
    },
    {
      id: "ORD-1233",
      date: "2024-04-10",
      status: "delivered",
      total: 26.98,
      items: 3,
    },
    {
      id: "ORD-1232",
      date: "2024-04-05",
      status: "delivered",
      total: 19.98,
      items: 3,
    },
    {
      id: "ORD-1231",
      date: "2024-04-01",
      status: "processing",
      total: 42.97,
      items: 3,
    },
  ]

  // Mock favorite items
  const favoriteItems = [
    { id: "1", name: "Chicken Burger", category: "Fast Food", orderCount: 8 },
    { id: "3", name: "Pepperoni Pizza", category: "Fast Food", orderCount: 5 },
    { id: "4", name: "Strawberry Milkshake", category: "Drinks", orderCount: 4 },
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

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

  const getOrderStatusBadge = (status) => {
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

  const handleAddPoints = () => {
    setPointsToAdd(0)
    setAddPointsDialog(true)
  }

  const confirmAddPoints = () => {
    // In a real app, this would call an API to add points to the customer
    setCurrentCustomer({
      ...currentCustomer,
      rewardPoints: currentCustomer.rewardPoints + Number.parseInt(pointsToAdd),
    })
    setAddPointsDialog(false)
  }

  const handleToggleBlock = () => {
    if (currentCustomer.status === "blocked") {
      // Unblock customer
      setCurrentCustomer({
        ...currentCustomer,
        status: "active",
      })
    } else {
      // Show block dialog
      setBlockReason("")
      setBlockDialog(true)
    }
  }

  const confirmBlock = () => {
    // In a real app, this would call an API to block the customer
    setCurrentCustomer({
      ...currentCustomer,
      status: "blocked",
    })
    setBlockDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Customers
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddPoints}>
            <Gift className="mr-2 h-4 w-4" />
            Add Reward Points
          </Button>
          {currentCustomer.status === "blocked" ? (
            <Button onClick={handleToggleBlock}>
              <Award className="mr-2 h-4 w-4" />
              Unblock Customer
            </Button>
          ) : (
            <Button variant="destructive" onClick={handleToggleBlock}>
              <Ban className="mr-2 h-4 w-4" />
              Block Customer
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{currentCustomer.name}</h3>
                <div className="mt-1">{getStatusBadge(currentCustomer.status)}</div>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{currentCustomer.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{currentCustomer.phone}</span>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Customer since</p>
                <p>{formatDate(currentCustomer.joinDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last order</p>
                <p>{formatDate(currentCustomer.lastOrder)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{currentCustomer.orders}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">${currentCustomer.spent.toFixed(2)}</p>
                </div>
                <div className="h-8 w-8 flex items-center justify-center text-xl font-bold text-muted-foreground">
                  $
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Reward Points</p>
                  <p className="text-2xl font-bold">{currentCustomer.rewardPoints}</p>
                </div>
                <Gift className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Order History</TabsTrigger>
              <TabsTrigger value="favorites">Favorite Items</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="space-y-4 pt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderHistory.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{formatDate(order.date)}</TableCell>
                          <TableCell>{order.items} items</TableCell>
                          <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                  <Button variant="outline">View All Orders</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="favorites" className="space-y-4 pt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Times Ordered</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {favoriteItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.orderCount} times</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={addPointsDialog} onOpenChange={setAddPointsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Reward Points</DialogTitle>
            <DialogDescription>Add reward points to {currentCustomer.name}'s account.</DialogDescription>
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
              <p className="text-sm text-muted-foreground">Current points: {currentCustomer.rewardPoints}</p>
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

      <Dialog open={blockDialog} onOpenChange={setBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to block {currentCustomer.name}? This will prevent them from placing new orders.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="reason" className="text-sm font-medium">
                Reason (optional)
              </label>
              <Input
                id="reason"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Enter reason for blocking"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBlockDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmBlock}>
              Block Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
