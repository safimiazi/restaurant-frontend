"use client"

import { useState } from "react"
import { EmployeeSidebar } from "@/components/employee-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter } from "lucide-react"

export default function EmployeeOrdersPage() {
  const [activeTab, setActiveTab] = useState("pending")

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <EmployeeSidebar activeTab="orders" />

        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold">Order Management</h1>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search orders..." className="w-[200px] pl-8 md:w-[300px]" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="ready">Ready for Delivery</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Orders</CardTitle>
                    <CardDescription>Orders that need to be processed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 text-sm font-medium text-muted-foreground">
                        <div>Order ID</div>
                        <div>Customer</div>
                        <div>Items</div>
                        <div>Time</div>
                        <div className="text-right">Action</div>
                      </div>

                      <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
                        <div className="font-medium">#ORD-1234</div>
                        <div>John Doe</div>
                        <div>3 items</div>
                        <div>10 mins ago</div>
                        <div className="text-right">
                          <Button size="sm">Process Order</Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
                        <div className="font-medium">#ORD-1232</div>
                        <div>Michael Smith</div>
                        <div>2 items</div>
                        <div>15 mins ago</div>
                        <div className="text-right">
                          <Button size="sm">Process Order</Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
                        <div className="font-medium">#ORD-1230</div>
                        <div>Robert Wilson</div>
                        <div>4 items</div>
                        <div>25 mins ago</div>
                        <div className="text-right">
                          <Button size="sm">Process Order</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="processing" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Processing Orders</CardTitle>
                    <CardDescription>Orders currently being prepared</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 text-sm font-medium text-muted-foreground">
                        <div>Order ID</div>
                        <div>Customer</div>
                        <div>Items</div>
                        <div>Status</div>
                        <div className="text-right">Action</div>
                      </div>

                      <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
                        <div className="font-medium">#ORD-1233</div>
                        <div>Sarah Johnson</div>
                        <div>3 items</div>
                        <div>
                          <Badge className="bg-blue-500">In Kitchen</Badge>
                        </div>
                        <div className="text-right">
                          <Button size="sm" variant="outline">
                            Mark Ready
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
                        <div className="font-medium">#ORD-1231</div>
                        <div>Emily Davis</div>
                        <div>3 items</div>
                        <div>
                          <Badge className="bg-blue-500">In Kitchen</Badge>
                        </div>
                        <div className="text-right">
                          <Button size="sm" variant="outline">
                            Mark Ready
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ready" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Ready for Delivery</CardTitle>
                    <CardDescription>Orders ready to be delivered or picked up</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 text-sm font-medium text-muted-foreground">
                        <div>Order ID</div>
                        <div>Customer</div>
                        <div>Items</div>
                        <div>Type</div>
                        <div className="text-right">Action</div>
                      </div>

                      <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
                        <div className="font-medium">#ORD-1229</div>
                        <div>Jennifer Brown</div>
                        <div>2 items</div>
                        <div>
                          <Badge variant="outline">Pickup</Badge>
                        </div>
                        <div className="text-right">
                          <Button size="sm" variant="outline">
                            Complete Order
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
                        <div className="font-medium">#ORD-1228</div>
                        <div>David Miller</div>
                        <div>3 items</div>
                        <div>
                          <Badge variant="outline">Delivery</Badge>
                        </div>
                        <div className="text-right">
                          <Button size="sm" variant="outline">
                            Assign Driver
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Completed Orders</CardTitle>
                    <CardDescription>Recently completed orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 text-sm font-medium text-muted-foreground">
                        <div>Order ID</div>
                        <div>Customer</div>
                        <div>Items</div>
                        <div>Completed</div>
                        <div className="text-right">Action</div>
                      </div>

                      <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
                        <div className="font-medium">#ORD-1227</div>
                        <div>Lisa Anderson</div>
                        <div>2 items</div>
                        <div>Today, 11:30 AM</div>
                        <div className="text-right">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
                        <div className="font-medium">#ORD-1226</div>
                        <div>Thomas Wilson</div>
                        <div>4 items</div>
                        <div>Today, 10:15 AM</div>
                        <div className="text-right">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
                        <div className="font-medium">#ORD-1225</div>
                        <div>Jessica Taylor</div>
                        <div>1 item</div>
                        <div>Today, 9:45 AM</div>
                        <div className="text-right">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
