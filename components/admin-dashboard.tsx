"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  Bell,
} from "lucide-react"

export function AdminDashboard() {
  // Sample data for charts
  const revenueData = [
    { name: "Jan", revenue: 4000, profit: 2400 },
    { name: "Feb", revenue: 3000, profit: 1398 },
    { name: "Mar", revenue: 2000, profit: 9800 },
    { name: "Apr", revenue: 2780, profit: 3908 },
    { name: "May", revenue: 1890, profit: 4800 },
    { name: "Jun", revenue: 2390, profit: 3800 },
    { name: "Jul", revenue: 3490, profit: 4300 },
  ]

  const productData = [
    { name: "Burgers", value: 400 },
    { name: "Pizza", value: 300 },
    { name: "Desserts", value: 200 },
    { name: "Drinks", value: 100 },
  ]

  const orderTrends = [
    { name: "Mon", orders: 42 },
    { name: "Tue", orders: 38 },
    { name: "Wed", orders: 45 },
    { name: "Thu", orders: 53 },
    { name: "Fri", orders: 68 },
    { name: "Sat", orders: 72 },
    { name: "Sun", orders: 64 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Today
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">$45,231.89</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +20.1% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Orders</p>
                <h3 className="text-2xl font-bold mt-1">2,350</h3>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +180.1% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Active Customers</p>
                <h3 className="text-2xl font-bold mt-1">573</h3>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +201 since last week
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Reward Points</p>
                <h3 className="text-2xl font-bold mt-1">24,331</h3>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +4.3% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue & Profit</CardTitle>
                <CardDescription>Monthly revenue and profit overview</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={revenueData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" />
                    <Bar dataKey="profit" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>Sales distribution by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
                    <div>Order</div>
                    <div>Customer</div>
                    <div>Status</div>
                    <div className="text-right">Amount</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 text-sm">
                    <div className="font-medium">#ORD-1234</div>
                    <div>John Doe</div>
                    <div>
                      <Badge className="bg-green-500">Delivered</Badge>
                    </div>
                    <div className="text-right font-medium">$32.97</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 text-sm">
                    <div className="font-medium">#ORD-1233</div>
                    <div>Sarah Johnson</div>
                    <div>
                      <Badge className="bg-blue-500">Processing</Badge>
                    </div>
                    <div className="text-right font-medium">$26.98</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 text-sm">
                    <div className="font-medium">#ORD-1232</div>
                    <div>Michael Smith</div>
                    <div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <div className="text-right font-medium">$19.98</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 text-sm">
                    <div className="font-medium">#ORD-1231</div>
                    <div>Emily Davis</div>
                    <div>
                      <Badge variant="destructive">Cancelled</Badge>
                    </div>
                    <div className="text-right font-medium">$42.97</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Order Trends</CardTitle>
                <CardDescription>Daily order volume</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={orderTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
                <CardDescription>Customers with highest spending this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-[35px] text-center font-medium">1</div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-sm text-muted-foreground">12 orders · $349.45</p>
                    </div>
                    <div className="ml-auto font-medium">250 points</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-[35px] text-center font-medium">2</div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">8 orders · $245.99</p>
                    </div>
                    <div className="ml-auto font-medium">180 points</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-[35px] text-center font-medium">3</div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Michael Smith</p>
                      <p className="text-sm text-muted-foreground">7 orders · $199.50</p>
                    </div>
                    <div className="ml-auto font-medium">150 points</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-2 rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                      <ShoppingBag className="h-3 w-3 text-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">New order #ORD-1234</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 rounded-full bg-green-100 p-1 dark:bg-green-900">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Payment received for #ORD-1233</p>
                      <p className="text-xs text-muted-foreground">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 rounded-full bg-purple-100 p-1 dark:bg-purple-900">
                      <Users className="h-3 w-3 text-purple-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">New customer registered</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 rounded-full bg-amber-100 p-1 dark:bg-amber-900">
                      <AlertCircle className="h-3 w-3 text-amber-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Product "Chicken Burger" updated</p>
                      <p className="text-xs text-muted-foreground">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Inventory Alerts</CardTitle>
                <CardDescription>Products with low stock</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Ice Cream Sundae</p>
                      <p className="text-xs text-muted-foreground">Desserts</p>
                    </div>
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Cheesecake</p>
                      <p className="text-xs text-muted-foreground">Desserts</p>
                    </div>
                    <Badge variant="outline">Low Stock (5)</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Fresh Orange Juice</p>
                      <p className="text-xs text-muted-foreground">Drinks</p>
                    </div>
                    <Badge variant="outline">Low Stock (8)</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Content</CardTitle>
              <CardDescription>Detailed analytics will be shown here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab will contain more detailed analytics and reports.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab will contain report generation tools and saved reports.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
