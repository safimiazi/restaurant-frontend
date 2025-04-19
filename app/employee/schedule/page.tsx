


"use client"

import { useState } from "react"
import { EmployeeSidebar } from "@/components/employee-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react"

export default function EmployeeSchedulePage() {
  const [currentWeek, setCurrentWeek] = useState("current")
  const [currentDate, setCurrentDate] = useState(new Date())

  // Function to format date as "Mon, Jun 10"
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  // Generate week dates
  const getWeekDates = () => {
    const today = new Date(currentDate)
    const day = today.getDay() // 0 = Sunday, 1 = Monday, etc.
    const diff = today.getDate() - day + (day === 0 ? -6 : 1) // Adjust to get Monday

    const monday = new Date(today.setDate(diff))
    const weekDates = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      weekDates.push(date)
    }

    return weekDates
  }

  const weekDates = getWeekDates()

  // Navigate to previous week
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
    setCurrentWeek("previous")
  }

  // Navigate to next week
  const goToNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
    setCurrentWeek("next")
  }

  // Reset to current week
  const goToCurrentWeek = () => {
    setCurrentDate(new Date())
    setCurrentWeek("current")
  }

  // Sample schedule data
  const scheduleData = {
    Monday: [
      { id: 1, shift: "Morning", time: "8:00 AM - 2:00 PM", role: "Cashier", location: "Main Counter" },
      { id: 2, shift: "Evening", time: "5:00 PM - 10:00 PM", role: "Server", location: "Dining Area" },
    ],
    Tuesday: [{ id: 3, shift: "Morning", time: "8:00 AM - 2:00 PM", role: "Cashier", location: "Main Counter" }],
    Wednesday: [{ id: 4, shift: "Afternoon", time: "12:00 PM - 6:00 PM", role: "Server", location: "Dining Area" }],
    Thursday: [{ id: 5, shift: "Evening", time: "4:00 PM - 10:00 PM", role: "Cashier", location: "Main Counter" }],
    Friday: [
      { id: 6, shift: "Morning", time: "8:00 AM - 2:00 PM", role: "Server", location: "Dining Area" },
      { id: 7, shift: "Evening", time: "5:00 PM - 11:00 PM", role: "Cashier", location: "Main Counter" },
    ],
    Saturday: [{ id: 8, shift: "Afternoon", time: "12:00 PM - 8:00 PM", role: "Server", location: "Dining Area" }],
    Sunday: [],
  }

  // Get day name from date
  const getDayName = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "long" })
  }

  // Check if date is today
  const isToday = (date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <EmployeeSidebar activeTab="schedule" />

        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold">Work Schedule</h1>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
                  <ChevronLeft className="h-4 w-4" />
                  Previous Week
                </Button>
                {currentWeek !== "current" && (
                  <Button variant="outline" size="sm" onClick={goToCurrentWeek}>
                    Current Week
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={goToNextWeek}>
                  Next Week
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <CardDescription>
                      {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
                    </CardDescription>
                  </div>
                  <Button>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Request Time Off
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {weekDates.map((date, index) => {
                    const dayName = getDayName(date)
                    const shifts = scheduleData[dayName] || []

                    return (
                      <div key={index} className="border rounded-lg overflow-hidden">
                        <div
                          className={`px-4 py-3 font-medium flex justify-between items-center ${isToday(date) ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                          <div className="flex items-center">
                            {formatDate(date)}
                            {isToday(date) && <Badge className="ml-2 bg-primary-foreground text-primary">Today</Badge>}
                          </div>
                          {shifts.length === 0 && <Badge variant="outline">Day Off</Badge>}
                        </div>

                        {shifts.length > 0 ? (
                          <div className="divide-y">
                            {shifts.map((shift) => (
                              <div
                                key={shift.id}
                                className="p-4 flex flex-col md:flex-row md:items-center justify-between"
                              >
                                <div>
                                  <div className="font-medium">{shift.shift} Shift</div>
                                  <div className="text-sm text-muted-foreground flex items-center mt-1">
                                    <Clock className="mr-1 h-3.5 w-3.5" />
                                    {shift.time}
                                  </div>
                                </div>
                                <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                                  <Badge variant="outline">{shift.role}</Badge>
                                  <div className="text-sm text-muted-foreground mt-1">{shift.location}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-muted-foreground">No shifts scheduled</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
