"use client"

import { useState } from "react"
import { EmployeeSidebar } from "@/components/employee-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Play, Square, Download, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function EmployeeTimesheetPage() {
  const [activeTab, setActiveTab] = useState("current")
  const [clockedIn, setClockedIn] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Format date as "June 2023"
  const formatMonth = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  // Navigate to previous month
  const goToPreviousMonth = () => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentMonth(newDate)
  }

  // Navigate to next month
  const goToNextMonth = () => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentMonth(newDate)
  }

  // Sample timesheet data
  const timesheetData = [
    {
      id: 1,
      date: "Mon, Jun 10, 2023",
      clockIn: "8:02 AM",
      clockOut: "2:05 PM",
      totalHours: "6h 3m",
      status: "approved",
    },
    {
      id: 2,
      date: "Tue, Jun 11, 2023",
      clockIn: "8:00 AM",
      clockOut: "2:00 PM",
      totalHours: "6h 0m",
      status: "approved",
    },
    {
      id: 3,
      date: "Wed, Jun 12, 2023",
      clockIn: "12:01 PM",
      clockOut: "6:03 PM",
      totalHours: "6h 2m",
      status: "approved",
    },
    {
      id: 4,
      date: "Thu, Jun 13, 2023",
      clockIn: "4:00 PM",
      clockOut: "10:05 PM",
      totalHours: "6h 5m",
      status: "approved",
    },
    {
      id: 5,
      date: "Fri, Jun 14, 2023",
      clockIn: "8:00 AM",
      clockOut: "2:00 PM",
      totalHours: "6h 0m",
      status: "approved",
    },
    {
      id: 6,
      date: "Fri, Jun 14, 2023",
      clockIn: "5:00 PM",
      clockOut: "11:00 PM",
      totalHours: "6h 0m",
      status: "approved",
    },
    {
      id: 7,
      date: "Sat, Jun 15, 2023",
      clockIn: "12:00 PM",
      clockOut: "8:00 PM",
      totalHours: "8h 0m",
      status: "pending",
    },
  ]

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  // Calculate total hours for current week
  const totalHoursThisWeek = 44.17 // In a real app, this would be calculated from actual data

  // Calculate weekly target (e.g., 40 hours)
  const weeklyTarget = 40
  const progressPercentage = Math.min((totalHoursThisWeek / weeklyTarget) * 100, 100)

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <EmployeeSidebar activeTab="timesheet" />

        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold">Timesheet Management</h1>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Timesheet</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Status</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{clockedIn ? "Clocked In" : "Clocked Out"}</div>
                  <p className="text-xs text-muted-foreground">
                    {clockedIn ? "Since 8:00 AM today" : "Last clocked out at 6:00 PM yesterday"}
                  </p>
                  <Button
                    className="mt-4 w-full"
                    onClick={() => setClockedIn(!clockedIn)}
                    variant={clockedIn ? "destructive" : "default"}
                  >
                    {clockedIn ? (
                      <>
                        <Square className="mr-2 h-4 w-4" />
                        Clock Out
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Clock In
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hours Today</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3h 45m</div>
                  <p className="text-xs text-muted-foreground">Target: 6h 0m</p>
                  <Progress className="mt-4" value={62.5} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hours This Week</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalHoursThisWeek}h</div>
                  <p className="text-xs text-muted-foreground">Target: {weeklyTarget}h 0m</p>
                  <Progress className="mt-4" value={progressPercentage} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Paycheck</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$845.50</div>
                  <p className="text-xs text-muted-foreground">Estimated for current hours</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="current">Current Period</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Pay Period</CardTitle>
                    <CardDescription>June 10 - June 23, 2023</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 text-sm font-medium text-muted-foreground">
                        <div>Date</div>
                        <div>Clock In</div>
                        <div>Clock Out</div>
                        <div>Total Hours</div>
                        <div className="text-right">Status</div>
                      </div>

                      {timesheetData.map((entry) => (
                        <div key={entry.id} className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
                          <div className="font-medium">{entry.date}</div>
                          <div>{entry.clockIn}</div>
                          <div>{entry.clockOut}</div>
                          <div>{entry.totalHours}</div>
                          <div className="text-right">{getStatusBadge(entry.status)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full justify-between">
                      <div className="text-sm text-muted-foreground">
                        Total Hours: <span className="font-bold">{totalHoursThisWeek}h</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Request Correction
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Timesheet History</CardTitle>
                        <CardDescription>{formatMonth(currentMonth)}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={goToNextMonth}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-muted-foreground py-8">
                      Select a pay period from the calendar to view detailed history
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
