/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ShoppingCart,
  Package,
  Users,
  BarChart,
  Percent,
  PieChart,
  Archive,
  Tag,
  Box,
  Layers,
  Ruler,
  Heart,
  ClipboardList,
  TrendingUp,
  Images,
} from "lucide-react";
import Category from "../pages/admin/productManagement/category/Category";
import Products from "../pages/admin/productManagement/products/Products";

import Brand from "../pages/admin/productManagement/brand/Brand";
import Coupon from "../pages/admin/CouponsAndDiscount/coupon/Coupon";
import Order from "../pages/admin/orderManagement/order/Order";
import Customer from "../pages/admin/userManagement/Customer";
import Cart from "../pages/admin/orderManagement/cart/Cart";
import WishList from "../pages/admin/orderManagement/wishlist/WishList";
import InventoryReport from "../pages/admin/reports/InventoryReport/InventoryReport";
import SalesReport from "../pages/admin/reports/salesReport/SalesReport";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Carousel from "../pages/admin/Carousel";
import Variants from "../pages/admin/productManagement/variants/Variants";

export type IAdminPath = {
  name: string;
  icon: any;
  path: string;
  element: any;
  children?: IAdminPath[];
};

export const adminPaths: IAdminPath[] = [
  {
    name: "Dashboard",
    icon: BarChart,
    path: "dashboard",
    element: <Dashboard/>,
  },
  {
    name: "Product Management",
    icon: Package,
    path: "product-management",
    element: <Products />,
    children: [
      {
        name: "Brand",
        icon: Tag,
        path: "brand",
        element: <Brand />,
      },
      {
        name: "Category",
        icon: Layers,
        path: "category",
        element: <Category />,
      },
      {
        name: "Variants",
        icon: Ruler,
        path: "variants",
        element: <Variants />,
      },
      {
        name: "Product",
        icon: Box,
        path: "product",
        element: <Products />,
      },

    ],
  },
  {
    name: "Order Management",
    icon: ShoppingCart,
    path: "order-management",
    element: <Products />,
    children: [
      {
        name: "Order",
        icon: ClipboardList,
        path: "order",
        element: <Order />,
      },
      {
        name: "Cart",
        icon: ShoppingCart,
        path: "cart",
        element: <Cart />,
      },
      {
        name: "Wishlist",
        icon: Heart,
        path: "wishlist",
        element: <WishList />,
      },
    ],
  },
  {
    name: "Customers",
    icon: Users,
    path: "customers",
    element: <Customer />,
  },
  {
    name: "Carousel",
    icon: Images,
    path: "carousel",
    element: <Carousel />,
  },
  {
    name: "Reports",
    icon: TrendingUp,
    path: "reports",
    element: "REPORTS",
    children: [
      {
        name: "Sales Report",
        icon: PieChart,
        path: "sales-report",
        element: <SalesReport />,
      },
      {
        name: "Inventory Report",
        icon: Archive,
        path: "inventory-report",
        element: <InventoryReport />,
      },
    ],
  },
  {
    name: "Coupons & Discounts",
    icon: Percent,
    path: "coupons-discounts",
    element: "COUPONS_DISCOUNTS",
    children: [
      {
        name: "Coupon",
        icon: Tag,
        path: "coupon",
        element: <Coupon />,
      },
    ],
  },
];
