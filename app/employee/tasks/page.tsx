"use client"

import { useState } from "react"
import { EmployeeSidebar } from "@/components/employee-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus, Clock, CheckCircle2, AlertCircle } from "lucide-react"

export default function EmployeeTasksPage() {
  const [activeTab, setActiveTab] = useState("pending")

  // Sample task data
  const pendingTasks = [
    {
      id: "task-1",
      title: "Restock napkins and utensils",
      priority: "Medium",
      dueDate: "Today, 5:00 PM",
      assignedBy: "John Manager",
    },
    {
      id: "task-2",
      title: "Clean coffee machine",
      priority: "High",
      dueDate: "Today, 3:00 PM",
      assignedBy: "Sarah Supervisor",
    },
    {
      id: "task-3",
      title: "Update menu display boards",
      priority: "Low",
      dueDate: "Tomorrow, 10:00 AM",
      assignedBy: "John Manager",
    },
  ]

  const inProgressTasks = [
    {
      id: "task-4",
      title: "Inventory check for produce",
      priority: "High",
      dueDate: "Today, 6:00 PM",
      assignedBy: "Sarah Supervisor",
    },
    {
      id: "task-5",
      title: "Prepare sauce containers for dinner rush",
      priority: "Medium",
      dueDate: "Today, 4:30 PM",
      assignedBy: "John Manager",
    },
  ]

  const completedTasks = [
    {
      id: "task-6",
      title: "Morning cleaning routine",
      priority: "High",
      completedDate: "Today, 9:30 AM",
      assignedBy: "Sarah Supervisor",
    },
    {
      id: "task-7",
      title: "Restock beverage cooler",
      priority: "Medium",
      completedDate: "Today, 11:15 AM",
      assignedBy: "John Manager",
    },
  ]

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-500">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "Low":
        return <Badge className="bg-green-500">Low</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <EmployeeSidebar activeTab="tasks" />

        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold">Task Management</h1>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search tasks..." className="w-[200px] pl-8 md:w-[300px]" />
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </div>
            </div>

            <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="inProgress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Tasks</CardTitle>
                    <CardDescription>Tasks that need to be started</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingTasks.map((task) => (
                        <div key={task.id} className="flex items-start justify-between border-b pb-4">
                          <div className="flex items-start gap-3">
                            <Checkbox id={task.id} />
                            <div>
                              <label htmlFor={task.id} className="font-medium cursor-pointer">
                                {task.title}
                              </label>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {task.dueDate}
                                </div>
                                <div>•</div>
                                <div>Assigned by: {task.assignedBy}</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getPriorityBadge(task.priority)}
                            <Button size="sm" variant="outline">
                              Start Task
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inProgress" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>In Progress Tasks</CardTitle>
                    <CardDescription>Tasks you are currently working on</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inProgressTasks.map((task) => (
                        <div key={task.id} className="flex items-start justify-between border-b pb-4">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                            <div>
                              <div className="font-medium">{task.title}</div>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {task.dueDate}
                                </div>
                                <div>•</div>
                                <div>Assigned by: {task.assignedBy}</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getPriorityBadge(task.priority)}
                            <Button size="sm">Complete</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Completed Tasks</CardTitle>
                    <CardDescription>Tasks you have finished</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {completedTasks.map((task) => (
                        <div key={task.id} className="flex items-start justify-between border-b pb-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <div className="font-medium line-through text-muted-foreground">{task.title}</div>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Clock className="mr-1 h-3 w-3" />
                                  Completed: {task.completedDate}
                                </div>
                                <div>•</div>
                                <div>Assigned by: {task.assignedBy}</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">{getPriorityBadge(task.priority)}</div>
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
