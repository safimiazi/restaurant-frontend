"use client"

import { useState } from "react"
import { EmployeeSidebar } from "@/components/employee-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Phone, Mail, MapPin, Star } from "lucide-react"

export default function EmployeeCustomersPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Sample customer data
  const customers = [
    {
      id: "cust-1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Anytown, USA",
      orders: 12,
      status: "regular",
      lastOrder: "2 days ago",
      totalSpent: "$345.50",
      loyaltyPoints: 230,
    },
    {
      id: "cust-2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave, Somewhere, USA",
      orders: 8,
      status: "regular",
      lastOrder: "5 days ago",
      totalSpent: "$210.75",
      loyaltyPoints: 180,
    },
    {
      id: "cust-3",
      name: "Michael Smith",
      email: "michael.smith@example.com",
      phone: "+1 (555) 456-7890",
      address: "789 Pine Rd, Nowhere, USA",
      orders: 24,
      status: "vip",
      lastOrder: "Yesterday",
      totalSpent: "$780.25",
      loyaltyPoints: 520,
    },
    {
      id: "cust-4",
      name: "Emily Wilson",
      email: "emily.w@example.com",
      phone: "+1 (555) 234-5678",
      address: "321 Elm St, Elsewhere, USA",
      orders: 3,
      status: "new",
      lastOrder: "1 week ago",
      totalSpent: "$85.30",
      loyaltyPoints: 40,
    },
    {
      id: "cust-5",
      name: "David Brown",
      email: "david.b@example.com",
      phone: "+1 (555) 876-5432",
      address: "654 Maple Dr, Anywhere, USA",
      orders: 18,
      status: "vip",
      lastOrder: "3 days ago",
      totalSpent: "$520.90",
      loyaltyPoints: 380,
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "vip":
        return <Badge className="bg-purple-500">VIP</Badge>
      case "regular":
        return <Badge className="bg-blue-500">Regular</Badge>
      case "new":
        return <Badge className="bg-green-500">New</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const filteredCustomers =
    activeTab === "all" ? customers : customers.filter((customer) => customer.status === activeTab)

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <EmployeeSidebar activeTab="customers" />

        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold">Customer Management</h1>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
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

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All Customers</TabsTrigger>
                <TabsTrigger value="vip">VIP</TabsTrigger>
                <TabsTrigger value="regular">Regular</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {activeTab === "all"
                        ? "All Customers"
                        : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Customers`}
                    </CardTitle>
                    <CardDescription>Manage and view customer information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {filteredCustomers.map((customer) => (
                        <div
                          key={customer.id}
                          className="flex flex-col md:flex-row md:items-start justify-between border-b pb-6"
                        >
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src={`/placeholder.svg?height=40&width=40&text=${getInitials(customer.name)}`}
                              />
                              <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{customer.name}</h3>
                                {getStatusBadge(customer.status)}
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground flex flex-col gap-1">
                                <div className="flex items-center">
                                  <Mail className="mr-2 h-3.5 w-3.5" />
                                  {customer.email}
                                </div>
                                <div className="flex items-center">
                                  <Phone className="mr-2 h-3.5 w-3.5" />
                                  {customer.phone}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="mr-2 h-3.5 w-3.5" />
                                  {customer.address}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 flex flex-col gap-2 text-sm">
                            <div className="flex justify-between gap-8">
                              <span className="text-muted-foreground">Orders:</span>
                              <span className="font-medium">{customer.orders}</span>
                            </div>
                            <div className="flex justify-between gap-8">
                              <span className="text-muted-foreground">Last Order:</span>
                              <span className="font-medium">{customer.lastOrder}</span>
                            </div>
                            <div className="flex justify-between gap-8">
                              <span className="text-muted-foreground">Total Spent:</span>
                              <span className="font-medium">{customer.totalSpent}</span>
                            </div>
                            <div className="flex justify-between gap-8">
                              <span className="text-muted-foreground">Loyalty Points:</span>
                              <span className="font-medium flex items-center">
                                {customer.loyaltyPoints}
                                <Star className="ml-1 h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                              </span>
                            </div>
                            <Button size="sm" className="mt-2">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
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
