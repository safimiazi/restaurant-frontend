"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClipboardList, Clock, ShoppingBag, CheckCircle, Bell, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, Employee</h1>
          <p className="text-muted-foreground">Here's what's happening today</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Clock In/Out
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Pending Orders</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">Needs attention</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Today's Tasks</p>
                <h3 className="text-2xl font-bold mt-1">8</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">3 completed</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Scheduled Hours</p>
                <h3 className="text-2xl font-bold mt-1">8.5</h3>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Today's shift</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Customer Queries</p>
                <h3 className="text-2xl font-bold mt-1">5</h3>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">Awaiting response</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center">
                <Users className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Tasks</CardTitle>
              <CardDescription>Your assigned tasks for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <ClipboardList className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Inventory check - Beverages</p>
                      <p className="text-xs text-muted-foreground">Due by 11:00 AM</p>
                    </div>
                  </div>
                  <Badge>High Priority</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Prepare workstation</p>
                      <p className="text-xs text-muted-foreground">Completed at 9:15 AM</p>
                    </div>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <ClipboardList className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Process pending orders</p>
                      <p className="text-xs text-muted-foreground">Due by 12:30 PM</p>
                    </div>
                  </div>
                  <Badge>Medium Priority</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Team meeting</p>
                      <p className="text-xs text-muted-foreground">Completed at 10:00 AM</p>
                    </div>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <ClipboardList className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Clean kitchen area</p>
                      <p className="text-xs text-muted-foreground">Due by 3:00 PM</p>
                    </div>
                  </div>
                  <Badge>Low Priority</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>Your task completion rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Tasks Completed</p>
                    <p className="text-sm font-medium">15/20</p>
                  </div>
                  <Progress value={75} className="mt-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">On-time Completion</p>
                    <p className="text-sm font-medium">90%</p>
                  </div>
                  <Progress value={90} className="mt-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Customer Satisfaction</p>
                    <p className="text-sm font-medium">4.8/5</p>
                  </div>
                  <Progress value={96} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Orders that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
                  <div>Order</div>
                  <div>Customer</div>
                  <div>Status</div>
                  <div className="text-right">Action</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 text-sm">
                  <div className="font-medium">#ORD-1234</div>
                  <div>John Doe</div>
                  <div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="text-right">
                    <Button size="sm" variant="outline">
                      Process
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 text-sm">
                  <div className="font-medium">#ORD-1233</div>
                  <div>Sarah Johnson</div>
                  <div>
                    <Badge className="bg-blue-500">Processing</Badge>
                  </div>
                  <div className="text-right">
                    <Button size="sm" variant="outline">
                      Complete
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 text-sm">
                  <div className="font-medium">#ORD-1232</div>
                  <div>Michael Smith</div>
                  <div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="text-right">
                    <Button size="sm" variant="outline">
                      Process
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 text-sm">
                  <div className="font-medium">#ORD-1231</div>
                  <div>Emily Davis</div>
                  <div>
                    <Badge className="bg-blue-500">Processing</Badge>
                  </div>
                  <div className="text-right">
                    <Button size="sm" variant="outline">
                      Complete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your work schedule for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-16 text-sm font-medium">9:00 AM</div>
                  <div className="ml-2 flex-1 rounded-md border border-l-4 border-l-blue-500 p-2">
                    <p className="text-sm font-medium">Start Shift</p>
                    <p className="text-xs text-muted-foreground">Clock in and prepare workstation</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-16 text-sm font-medium">10:00 AM</div>
                  <div className="ml-2 flex-1 rounded-md border border-l-4 border-l-green-500 p-2">
                    <p className="text-sm font-medium">Team Meeting</p>
                    <p className="text-xs text-muted-foreground">Daily briefing with the team</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-16 text-sm font-medium">11:00 AM</div>
                  <div className="ml-2 flex-1 rounded-md border border-l-4 border-l-purple-500 p-2">
                    <p className="text-sm font-medium">Inventory Check</p>
                    <p className="text-xs text-muted-foreground">Verify stock levels for beverages</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-16 text-sm font-medium">1:00 PM</div>
                  <div className="ml-2 flex-1 rounded-md border border-l-4 border-l-amber-500 p-2">
                    <p className="text-sm font-medium">Lunch Break</p>
                    <p className="text-xs text-muted-foreground">30 minute break</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-16 text-sm font-medium">2:00 PM</div>
                  <div className="ml-2 flex-1 rounded-md border border-l-4 border-l-blue-500 p-2">
                    <p className="text-sm font-medium">Order Processing</p>
                    <p className="text-xs text-muted-foreground">Handle pending customer orders</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-16 text-sm font-medium">5:30 PM</div>
                  <div className="ml-2 flex-1 rounded-md border border-l-4 border-l-red-500 p-2">
                    <p className="text-sm font-medium">End Shift</p>
                    <p className="text-xs text-muted-foreground">Clean up and clock out</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
