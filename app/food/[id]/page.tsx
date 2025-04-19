"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { Skeleton } from "@/components/ui/skeleton"

interface FoodDetailPageProps {
  params: {
    id: string
  }
}

export default function FoodDetailPage({ params }: FoodDetailPageProps) {
  const [loading, setLoading] = useState(true)
  const [food, setFood] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchFoodData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on food ID
      const foodData = {
        "1": {
          id: "1",
          name: "Chicken Burger",
          description:
            "Our signature chicken burger made with a juicy chicken patty, fresh lettuce, tomatoes, and our special sauce. Served with a side of crispy fries.",
          price: 8.99,
          image: "/placeholder.svg?height=400&width=600",
          category: "fast-food",
          variants: [
            { id: "1-1", name: "Classic Chicken Burger", price: 8.99 },
            { id: "1-2", name: "Spicy Chicken Burger", price: 9.49 },
            { id: "1-3", name: "Cheese Chicken Burger", price: 9.99 },
          ],
        },
        "2": {
          id: "2",
          name: "Chocolate Cake",
          description:
            "Rich and moist chocolate cake with layers of chocolate ganache and fudge frosting. Perfect for dessert lovers!",
          price: 6.99,
          image: "/placeholder.svg?height=400&width=600",
          category: "desserts",
          variants: [
            { id: "2-1", name: "Single Slice", price: 6.99 },
            { id: "2-2", name: "Double Slice", price: 12.99 },
            { id: "2-3", name: "Whole Cake (8 slices)", price: 49.99 },
          ],
        },
      }

      const data = foodData[params.id]
      if (data) {
        setFood(data)
        setSelectedVariant(data.variants[0])
      }
      setLoading(false)
    }

    fetchFoodData()
  }, [params.id])

  const handleAddToCart = () => {
    if (food && selectedVariant) {
      addToCart({
        ...food,
        variantId: selectedVariant.id,
        variantName: selectedVariant.name,
        price: selectedVariant.price,
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!food) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Food item not found</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
          <Image src={food.image || "/placeholder.svg"} alt={food.name} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{food.name}</h1>
          <p className="text-xl font-medium text-muted-foreground mb-4">${selectedVariant?.price.toFixed(2)}</p>
          <p className="mb-6">{food.description}</p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Select Variant</h3>
              <RadioGroup
                defaultValue={food.variants[0].id}
                onValueChange={(value) => {
                  const variant = food.variants.find((v) => v.id === value)
                  setSelectedVariant(variant)
                }}
              >
                {food.variants.map((variant) => (
                  <div key={variant.id} className="flex items-center justify-between space-y-2 py-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={variant.id} id={variant.id} />
                      <Label htmlFor={variant.id}>{variant.name}</Label>
                    </div>
                    <span>${variant.price.toFixed(2)}</span>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Button onClick={handleAddToCart} size="lg" className="w-full">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
