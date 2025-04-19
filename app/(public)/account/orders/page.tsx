"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye } from "lucide-react"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch orders from the backend
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: "ORD-1234",
          date: "2024-04-15",
          status: "delivered",
          total: 32.97,
          items: [
            { id: "1", name: "Chicken Burger", quantity: 2, price: 8.99 },
            { id: "4", name: "Strawberry Milkshake", quantity: 1, price: 4.99 },
            { id: "6", name: "French Fries", quantity: 2, price: 3.99 },
          ],
          paymentMethod: "Cash on Delivery",
        },
        {
          id: "ORD-1233",
          date: "2024-04-10",
          status: "delivered",
          total: 26.98,
          items: [
            { id: "3", name: "Pepperoni Pizza", quantity: 1, price: 12.99 },
            { id: "9", name: "Iced Coffee", quantity: 2, price: 3.99 },
            { id: "6", name: "French Fries", quantity: 1, price: 3.99 },
          ],
          paymentMethod: "Online Payment",
        },
        {
          id: "ORD-1232",
          date: "2024-04-05",
          status: "delivered",
          total: 19.98,
          items: [
            { id: "1", name: "Chicken Burger", quantity: 1, price: 8.99 },
            { id: "2", name: "Chocolate Cake", quantity: 1, price: 6.99 },
            { id: "4", name: "Strawberry Milkshake", quantity: 1, price: 4.99 },
          ],
          paymentMethod: "Cash on Delivery",
        },
        {
          id: "ORD-1231",
          date: "2024-04-01",
          status: "processing",
          total: 42.97,
          items: [
            { id: "11", name: "Grilled Salmon", quantity: 1, price: 16.99 },
            { id: "12", name: "Steak", quantity: 1, price: 19.99 },
            { id: "10", name: "Fresh Orange Juice", quantity: 1, price: 4.49 },
          ],
          paymentMethod: "Manual Payment",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

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
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>
      case "processing":
        return <Badge className="bg-blue-500">Processing</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <p>Loading order history...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                {getStatusBadge(order.status)}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-muted-foreground">{formatDate(order.date)}</p>
                    </div>
                    <div>
                      <p className="font-medium">Total</p>
                      <p className="text-muted-foreground">${order.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="font-medium">Payment Method</p>
                      <p className="text-muted-foreground">{order.paymentMethod}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-2">Items</p>
                    <ul className="space-y-1 text-sm">
                      {order.items.map((item) => (
                        <li key={`${order.id}-${item.id}`} className="flex justify-between">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end">
                    <Link href={`/account/orders/${order.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="processing" className="space-y-6">
          {orders
            .filter((order) => order.status === "processing")
            .map((order) => (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  {getStatusBadge(order.status)}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-muted-foreground">{formatDate(order.date)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Total</p>
                        <p className="text-muted-foreground">${order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Payment Method</p>
                        <p className="text-muted-foreground">{order.paymentMethod}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium mb-2">Items</p>
                      <ul className="space-y-1 text-sm">
                        {order.items.map((item) => (
                          <li key={`${order.id}-${item.id}`} className="flex justify-between">
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-end">
                      <Link href={`/account/orders/${order.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="delivered" className="space-y-6">
          {orders
            .filter((order) => order.status === "delivered")
            .map((order) => (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  {getStatusBadge(order.status)}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-muted-foreground">{formatDate(order.date)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Total</p>
                        <p className="text-muted-foreground">${order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Payment Method</p>
                        <p className="text-muted-foreground">{order.paymentMethod}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium mb-2">Items</p>
                      <ul className="space-y-1 text-sm">
                        {order.items.map((item) => (
                          <li key={`${order.id}-${item.id}`} className="flex justify-between">
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-end">
                      <Link href={`/account/orders/${order.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
