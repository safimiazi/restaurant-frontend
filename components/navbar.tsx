"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, User } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartSheet } from "@/components/cart-sheet"
import { MobileNav } from "@/components/mobile-nav"

export function Navbar() {
  const { totalItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="pr-0">
            <MobileNav onNavItemClick={() => setMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">Tasty Bites</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1">
          <Link href="/" className="transition-colors hover:text-foreground/80">
            Home
          </Link>
          <Link href="/category/fast-food" className="transition-colors hover:text-foreground/80">
            Fast Food
          </Link>
          <Link href="/category/desserts" className="transition-colors hover:text-foreground/80">
            Desserts
          </Link>
          <Link href="/category/drinks" className="transition-colors hover:text-foreground/80">
            Drinks
          </Link>
          <Link href="/category/main-course" className="transition-colors hover:text-foreground/80">
            Main Course
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Link href="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Open cart</span>
              </Button>
            </SheetTrigger>
            <CartSheet />
          </Sheet>
        </div>
      </div>
    </header>
  )
}
