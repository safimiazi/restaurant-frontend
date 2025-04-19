"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  ShoppingCart,
  ClipboardList,
  Users,
  Clock,
  LogOut,
  MessageSquare,
  Calendar,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface EmployeeSidebarProps {
  activeTab?: string
  setActiveTab?: (tab: string) => void
}

export function EmployeeSidebar({ activeTab = "dashboard", setActiveTab }: EmployeeSidebarProps) {
  const router = useRouter()
  const { isMobile } = useSidebar()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [activeTab])

  const menuItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/employee",
    },
    {
      id: "orders",
      name: "Orders",
      icon: ShoppingCart,
      href: "/employee/orders",
    },
    {
      id: "tasks",
      name: "Tasks",
      icon: ClipboardList,
      href: "/employee/tasks",
    },
    {
      id: "customers",
      name: "Customers",
      icon: Users,
      href: "/employee/customers",
    },
    {
      id: "schedule",
      name: "Schedule",
      icon: Calendar,
      href: "/employee/schedule",
    },
    {
      id: "timesheet",
      name: "Timesheet",
      icon: Clock,
      href: "/employee/timesheet",
    },
    {
      id: "messages",
      name: "Messages",
      icon: MessageSquare,
      href: "/employee/messages",
    },
  ]

  const handleMenuClick = (itemId, href) => {
    if (setActiveTab) {
      setActiveTab(itemId)
    }
    router.push(href)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-[280px]">
            <div className="flex h-[60px] items-center px-6 border-b">
              <Link href="/employee" className="flex items-center gap-2 font-semibold">
                <ClipboardList className="h-6 w-6" />
                <span>Employee Portal</span>
              </Link>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="py-4">
              <div className="space-y-1 px-3">
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleMenuClick(item.id, item.href)}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </Button>
                ))}
              </div>
              <div className="px-3 mt-6">
                <Button variant="outline" className="w-full" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </>
    )
  }

  // Desktop sidebar
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex h-[60px] items-center px-6">
          <Link href="/employee" className="flex items-center gap-2 font-semibold">
            <ClipboardList className="h-6 w-6" />
            <span>Employee Portal</span>
          </Link>
          <SidebarTrigger className="ml-auto md:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton isActive={activeTab === item.id} onClick={() => handleMenuClick(item.id, item.href)}>
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <Button variant="outline" className="w-full" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
