"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import {
  LayoutDashboard,
  PackageCheck,
  ListOrdered,
  ListChecks,
  Boxes,
  ShoppingCart,
  Tags,
  UsersRound,
  BarChart3,
  Gift,
  Settings,
  Package,
  LogOut,
  Menu,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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
} from "@/components/ui/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface AdminSidebarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export function AdminSidebar({
  activeTab = "dashboard",
  setActiveTab,
}: AdminSidebarProps) {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [activeTab]);

  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  const toggleSubmenu = (id: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isSubmenuOpen = (id: string) => openSubmenus.includes(id);

  const menuItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      id: "product_management",
      name: "Product Management",
      icon: PackageCheck,
      children: [
        {
          id: "attributes",
          name: "Attributes",
          icon: ListOrdered,
          href: "/admin/product-management/attributes",
        },
        {
          id: "attribute_options",
          name: "Attribute Options",
          icon: ListChecks,
          href: "/admin/product-management/attribute-options",
        },
        {
          id: "products",
          name: "Products",
          icon: Boxes,
          href: "/admin/products",
        },
      ],
    },
    {
      id: "orders",
      name: "Orders",
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    {
      id: "categories",
      name: "Categories",
      icon: Tags,
      href: "/admin/categories",
    },
    {
      id: "customers",
      name: "Customers",
      icon: UsersRound,
      href: "/admin/customers",
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: BarChart3,
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
  ];

  const handleMenuClick = (itemId: any, href: any) => {
    if (setActiveTab) {
      setActiveTab(itemId);
    }
    router?.push(href);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

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
              <Link
                href="/admin"
                className="flex items-center gap-2 font-semibold"
              >
                <Package className="h-6 w-6" />
                <span>Admin Panel</span>
              </Link>
            </div>
            <div className="py-4">
              <SidebarContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      {item.children ? (
                        <>
                          <SidebarMenuButton
                            isActive={isSubmenuOpen(item.id)}
                            onClick={() => toggleSubmenu(item.id)}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                            <ArrowRight
                              className={`ml-auto h-4 w-4 transition-transform ${
                                isSubmenuOpen(item.id) ? "rotate-90" : ""
                              }`}
                            />
                          </SidebarMenuButton>
                          {isSubmenuOpen(item.id) && (
                            <div className="pl-4 mt-1">
                              {item.children.map((child) => (
                                <SidebarMenuButton
                                  key={child.id}
                                  isActive={activeTab === child.id}
                                  onClick={() =>
                                    handleMenuClick(child.id, child.href)
                                  }
                                  className="text-sm"
                                >
                                  <child.icon className="h-4 w-4" />
                                  <span>{child.name}</span>
                                </SidebarMenuButton>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <SidebarMenuButton
                          isActive={activeTab === item.id}
                          onClick={() => handleMenuClick(item.id, item.href)}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>
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
    );
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
              {item.children ? (
                <>
                  <SidebarMenuButton
                    isActive={isSubmenuOpen(item.id)}
                    onClick={() => toggleSubmenu(item.id)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                    <ArrowRight
                      className={`ml-auto h-4 w-4 transition-transform ${
                        isSubmenuOpen(item.id) ? "rotate-90" : ""
                      }`}
                    />
                  </SidebarMenuButton>
                  {isSubmenuOpen(item.id) && (
                    <div className="pl-4 mt-1">
                      {item.children.map((child) => (
                        <SidebarMenuButton
                          key={child.id}
                          isActive={activeTab === child.id}
                          onClick={() => handleMenuClick(child.id, child.href)}
                          className="text-sm"
                        >
                          <child.icon className="h-4 w-4" />
                          <span>{child.name}</span>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <SidebarMenuButton
                  isActive={activeTab === item.id}
                  onClick={() => handleMenuClick(item.id, item.href)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              )}
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
  );
}
