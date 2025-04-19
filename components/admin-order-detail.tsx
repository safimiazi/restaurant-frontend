"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Printer, CheckCircle, XCircle, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface AdminOrderDetailProps {
  order: any
  onBack: () => void
}

export function AdminOrderDetail({ order, onBack }: AdminOrderDetailProps) {
  const [updateStatusDialog, setUpdateStatusDialog] = useState(false)
  const [newStatus, setNewStatus] = useState("")
  const [statusNote, setStatusNote] = useState("")
  const [currentOrder, setCurrentOrder] = useState(order)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  const handleUpdateStatus = (status) => {
    setNewStatus(status)
    setStatusNote("")
    setUpdateStatusDialog(true)
  }

  const confirmUpdateStatus = () => {
    // In a real app, this would call an API to update the order status
    setCurrentOrder({
      ...currentOrder,
      status: newStatus,
    })
    setUpdateStatusDialog(false)
  }

  const handlePrint = () => {
    window.print()
  }

  // Calculate subtotal, tax, and shipping
  const subtotal = currentOrder.items.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // Assuming 8% tax
  const shipping = 2.99

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print Order
          </Button>
          {currentOrder.status !== "delivered" && (
            <Button onClick={() => handleUpdateStatus("delivered")}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Delivered
            </Button>
          )}
          {currentOrder.status !== "processing" && currentOrder.status !== "delivered" && (
            <Button variant="outline" onClick={() => handleUpdateStatus("processing")}>
              <Clock className="mr-2 h-4 w-4" />
              Mark as Processing
            </Button>
          )}
          {currentOrder.status !== "cancelled" && (
            <Button variant="destructive" onClick={() => handleUpdateStatus("cancelled")}>
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Order
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentOrder.items.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex justify-between items-start pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Variant: {item.variant}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p>${item.price.toFixed(2)} each</p>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex-col items-end space-y-2">
              <div className="flex justify-between w-full md:w-1/2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between w-full md:w-1/2">
                <span>Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between w-full md:w-1/2">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between w-full md:w-1/2 font-bold">
                <span>Total:</span>
                <span>${currentOrder.total.toFixed(2)}</span>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-muted-foreground">{currentOrder.address}</p>
                </div>
                {currentOrder.notes && (
                  <div>
                    <p className="font-medium">Customer Notes</p>
                    <p className="text-muted-foreground">{currentOrder.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Order ID</p>
                <p className="text-muted-foreground">{currentOrder.id}</p>
              </div>
              <div>
                <p className="font-medium">Date</p>
                <p className="text-muted-foreground">{formatDate(currentOrder.date)}</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <div className="mt-1">{getStatusBadge(currentOrder.status)}</div>
              </div>
              <Separator />
              <div>
                <p className="font-medium">Payment Method</p>
                <p className="text-muted-foreground">{currentOrder.paymentMethod}</p>
              </div>
              <div>
                <p className="font-medium">Payment Status</p>
                <div className="mt-1">{getPaymentStatusBadge(currentOrder.paymentStatus)}</div>
              </div>
              {currentOrder.paymentMethod === "Manual Payment" && (
                <div>
                  <p className="font-medium">Transaction ID</p>
                  <p className="text-muted-foreground">{currentOrder.transactionId || "Not provided"}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Name</p>
                <p className="text-muted-foreground">{currentOrder.customer}</p>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-muted-foreground">{currentOrder.customerPhone}</p>
              </div>
              <Button variant="outline" className="w-full">
                View Customer Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={updateStatusDialog} onOpenChange={setUpdateStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Are you sure you want to change the status of order #{currentOrder.id} to {newStatus}?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="status-note" className="text-sm font-medium">
                Add a note (optional)
              </label>
              <Textarea
                id="status-note"
                placeholder="Enter a note about this status change"
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
              />
            </div>
          </div>
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
