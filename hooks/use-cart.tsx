"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type CartItem = {
  id: string
  name: string
  price: number
  image: string
  variantId?: string
  variantName?: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addToCart: (item: any) => void
  removeFromCart: (itemId: string, variantId?: string) => void
  updateQuantity: (itemId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addToCart = (item: any) => {
    setItems((prevItems) => {
      // Check if item with same variant already exists
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id && i.variantId === item.variantId)

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += 1
        return updatedItems
      } else {
        // Add new item
        return [...prevItems, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: string, variantId?: string) => {
    setItems((prevItems) => prevItems.filter((item) => !(item.id === itemId && item.variantId === variantId)))
  }

  const updateQuantity = (itemId: string, quantity: number, variantId?: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId && item.variantId === variantId ? { ...item, quantity } : item)),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
