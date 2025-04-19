"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  BarChart,
  LogOut,
  Tag,
  Gift,
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

interface AdminSidebarProps {
  activeTab?: string
  setActiveTab?: (tab: string) => void
}

export function AdminSidebar({ activeTab = "dashboard", setActiveTab }: AdminSidebarProps) {
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
      href: "/admin",
    },
    {
      id: "orders",
      name: "Orders",
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    {
      id: "products",
      name: "Products",
      icon: Package,
      href: "/admin/products",
    },
    {
      id: "categories",
      name: "Categories",
      icon: Tag,
      href: "/admin/categories",
    },
    {
      id: "customers",
      name: "Customers",
      icon: Users,
      href: "/admin/customers",
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: BarChart,
      href: "/admin/analytics",
    },
    {
      id: "rewards",
      name: "Rewards",
      icon: Gift,
      href: "/admin/rewards",
    },
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
      href: "/admin/settings",
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
              <Link href="/admin" className="flex items-center gap-2 font-semibold">
                <Package className="h-6 w-6" />
                <span>Admin Panel</span>
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
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span>Admin Panel</span>
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
