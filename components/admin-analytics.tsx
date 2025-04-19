"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  AreaChart,
  Area,
} from "recharts"

export function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("month")
  const [loading, setLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState(null)

  useEffect(() => {
    // In a real app, this would fetch analytics data from the backend
    // Simulate API call
    setTimeout(() => {
      setAnalyticsData({
        // Revenue data
        revenue: {
          daily: [
            { name: "Mon", revenue: 1200, profit: 480 },
            { name: "Tue", revenue: 1100, profit: 440 },
            { name: "Wed", revenue: 1300, profit: 520 },
            { name: "Thu", revenue: 1500, profit: 600 },
            { name: "Fri", revenue: 2000, profit: 800 },
            { name: "Sat", revenue: 2200, profit: 880 },
            { name: "Sun", revenue: 1800, profit: 720 },
          ],
          weekly: [
            { name: "Week 1", revenue: 8000, profit: 3200 },
            { name: "Week 2", revenue: 9500, profit: 3800 },
            { name: "Week 3", revenue: 8700, profit: 3480 },
            { name: "Week 4", revenue: 9800, profit: 3920 },
          ],
          monthly: [
            { name: "Jan", revenue: 35000, profit: 14000 },
            { name: "Feb", revenue: 32000, profit: 12800 },
            { name: "Mar", revenue: 30000, profit: 12000 },
            { name: "Apr", revenue: 34000, profit: 13600 },
            { name: "May", revenue: 38000, profit: 15200 },
            { name: "Jun", revenue: 42000, profit: 16800 },
            { name: "Jul", revenue: 45000, profit: 18000 },
          ],
        },

        // Product categories data
        categories: [
          { name: "Fast Food", value: 45 },
          { name: "Desserts", value: 20 },
          { name: "Drinks", value: 15 },
          { name: "Main Course", value: 20 },
        ],

        // Order trends data
        orders: {
          daily: [
            { name: "Mon", orders: 42 },
            { name: "Tue", orders: 38 },
            { name: "Wed", orders: 45 },
            { name: "Thu", orders: 53 },
            { name: "Fri", orders: 68 },
            { name: "Sat", orders: 72 },
            { name: "Sun", orders: 64 },
          ],
          weekly: [
            { name: "Week 1", orders: 280 },
            { name: "Week 2", orders: 320 },
            { name: "Week 3", orders: 305 },
            { name: "Week 4", orders: 340 },
          ],
          monthly: [
            { name: "Jan", orders: 1200 },
            { name: "Feb", orders: 1100 },
            { name: "Mar", orders: 1050 },
            { name: "Apr", orders: 1150 },
            { name: "May", orders: 1300 },
            { name: "Jun", orders: 1450 },
            { name: "Jul", orders: 1550 },
          ],
        },

        // Payment methods data
        paymentMethods: [
          { name: "Cash on Delivery", value: 35 },
          { name: "Online Payment", value: 45 },
          { name: "Manual Payment", value: 20 },
        ],

        // Top products data
        topProducts: [
          { name: "Chicken Burger", orders: 320, revenue: 2879.2 },
          { name: "Pepperoni Pizza", orders: 285, revenue: 3702.15 },
          { name: "Strawberry Milkshake", orders: 240, revenue: 1197.6 },
          { name: "French Fries", orders: 230, revenue: 917.7 },
          { name: "Chocolate Cake", orders: 210, revenue: 1467.9 },
        ],

        // Customer acquisition data
        customerAcquisition: [
          { name: "Jan", newCustomers: 85, returningCustomers: 120 },
          { name: "Feb", newCustomers: 75, returningCustomers: 110 },
          { name: "Mar", newCustomers: 70, returningCustomers: 105 },
          { name: "Apr", newCustomers: 80, returningCustomers: 115 },
          { name: "May", newCustomers: 90, returningCustomers: 125 },
          { name: "Jun", newCustomers: 100, returningCustomers: 135 },
          { name: "Jul", newCustomers: 110, returningCustomers: 145 },
        ],
      })
      setLoading(false)
    }, 1500)
  }, [])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  // Helper function to get data based on selected time range
  const getTimeRangeData = (dataObj) => {
    if (!dataObj) return []
    return dataObj[timeRange] || []
  }

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading analytics data...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Last 7 Days</SelectItem>
            <SelectItem value="weekly">Last 4 Weeks</SelectItem>
            <SelectItem value="monthly">Last 7 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reward Points Issued</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+24,331</div>
            <p className="text-xs text-muted-foreground">+4.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue & Profit</TabsTrigger>
          <TabsTrigger value="orders">Order Trends</TabsTrigger>
          <TabsTrigger value="products">Product Analysis</TabsTrigger>
          <TabsTrigger value="customers">Customer Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue & Profit</CardTitle>
                <CardDescription>
                  {timeRange === "daily" ? "Last 7 days" : timeRange === "weekly" ? "Last 4 weeks" : "Last 7 months"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={getTimeRangeData(analyticsData?.revenue)}
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
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                    <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution by payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData?.paymentMethods}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData?.paymentMethods.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Order Trends</CardTitle>
                <CardDescription>
                  {timeRange === "daily" ? "Last 7 days" : timeRange === "weekly" ? "Last 4 weeks" : "Last 7 months"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart
                    data={getTimeRangeData(analyticsData?.orders)}
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
                    <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} name="Orders" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Most ordered products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-[35px] text-center font-medium">{index + 1}</div>
                      <div className="ml-4 space-y-1 flex-1">
                        <p className="text-sm font-medium leading-none">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.orders} orders</p>
                      </div>
                      <div className="ml-auto font-medium">${product.revenue.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>Sales distribution by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData?.categories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData?.categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Top Products Performance</CardTitle>
                <CardDescription>Revenue generated by top products</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={analyticsData?.topProducts}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Customer Acquisition</CardTitle>
                <CardDescription>New vs. returning customers</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart
                    data={analyticsData?.customerAcquisition}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="newCustomers"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      name="New Customers"
                    />
                    <Area
                      type="monotone"
                      dataKey="returningCustomers"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="Returning Customers"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Customer Retention</CardTitle>
                <CardDescription>Monthly retention rate</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart
                    data={[
                      { name: "Jan", retention: 65 },
                      { name: "Feb", retention: 68 },
                      { name: "Mar", retention: 70 },
                      { name: "Apr", retention: 72 },
                      { name: "May", retention: 75 },
                      { name: "Jun", retention: 78 },
                      { name: "Jul", retention: 80 },
                    ]}
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
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Line type="monotone" dataKey="retention" stroke="#ff7300" name="Retention Rate %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
