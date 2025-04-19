"use client"

import Image from "next/image"
import Link from "next/link"
import { SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash, Plus, Minus } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { ScrollArea } from "@/components/ui/scroll-area"

export function CartSheet() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart()

  return (
    <SheetContent className="flex w-full flex-col sm:max-w-lg">
      <SheetHeader className="px-1">
        <SheetTitle>Shopping Cart</SheetTitle>
      </SheetHeader>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add items to your cart to see them here.</p>
          </div>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 px-1">
            <div className="space-y-4 py-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.variantId}`} className="flex items-start gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        {item.variantName && <p className="text-xs text-muted-foreground">{item.variantName}</p>}
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item.id, item.quantity - 1, item.variantId)
                            } else {
                              removeFromCart(item.id, item.variantId)
                            }
                          }}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-4 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variantId)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => removeFromCart(item.id, item.variantId)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="space-y-4 px-1">
            <Separator />
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="font-medium">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-muted-foreground">Calculated at checkout</span>
              </div>
            </div>
            <SheetFooter>
              <Link href="/checkout" className="w-full">
                <Button className="w-full">Checkout</Button>
              </Link>
            </SheetFooter>
          </div>
        </>
      )}
    </SheetContent>
  )
}
