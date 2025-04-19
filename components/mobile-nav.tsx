"use client"

import Link from "next/link"
import { Home, ShoppingBag, Coffee, Cake, Utensils } from "lucide-react"

interface MobileNavProps {
  onNavItemClick: () => void
}

export function MobileNav({ onNavItemClick }: MobileNavProps) {
  return (
    <div className="flex flex-col space-y-3 p-4">
      <Link href="/" className="flex items-center space-x-2 py-2" onClick={onNavItemClick}>
        <Home className="h-5 w-5" />
        <span>Home</span>
      </Link>
      <Link href="/category/fast-food" className="flex items-center space-x-2 py-2" onClick={onNavItemClick}>
        <ShoppingBag className="h-5 w-5" />
        <span>Fast Food</span>
      </Link>
      <Link href="/category/desserts" className="flex items-center space-x-2 py-2" onClick={onNavItemClick}>
        <Cake className="h-5 w-5" />
        <span>Desserts</span>
      </Link>
      <Link href="/category/drinks" className="flex items-center space-x-2 py-2" onClick={onNavItemClick}>
        <Coffee className="h-5 w-5" />
        <span>Drinks</span>
      </Link>
      <Link href="/category/main-course" className="flex items-center space-x-2 py-2" onClick={onNavItemClick}>
        <Utensils className="h-5 w-5" />
        <span>Main Course</span>
      </Link>
    </div>
  )
}
