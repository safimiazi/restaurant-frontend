"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Clock, Calendar, Info } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/components/ui/use-toast"

export default function FamilyComboPage() {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleAddToCart = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      addToCart({
        id: "family-combo",
        name: "Family Combo",
        description: "2 Large Pizzas + 4 Drinks + 2 Sides",
        price: 39.99,
        discountedPrice: 29.99,
        image: "/placeholder.svg?height=300&width=600",
        variantId: "family-combo-1",
        variantName: "Family Combo",
      })

      toast({
        title: "Added to cart",
        description: "Family Combo has been added to your cart",
      })

      setLoading(false)
    }, 1000)
  }

  const includedItems = [
    { name: "Large Pepperoni Pizza", price: 14.99 },
    { name: "Large Vegetarian Pizza", price: 14.99 },
    { name: "Coca-Cola (4 x 500ml)", price: 8.99 },
    { name: "Garlic Bread", price: 4.99 },
    { name: "Chicken Wings", price: 7.99 },
  ]

  const totalRegularPrice = includedItems.reduce((sum, item) => sum + item.price, 0)
  const savings = totalRegularPrice - 29.99

  return (
    <div className="space-y-8">
      <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
        <Badge className="absolute top-4 right-4 z-10 text-lg px-3 py-1.5">25% OFF</Badge>
        <Image src="/placeholder.svg?height=300&width=1200" alt="Family Combo" fill className="object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Family Combo</h2>
            <div className="flex items-center mt-2 space-x-4">
              <p className="text-2xl font-semibold">$29.99</p>
              <p className="text-xl text-muted-foreground line-through">$39.99</p>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Save ${savings.toFixed(2)}
              </Badge>
            </div>
          </div>

          <p className="text-lg">
            Enjoy our Family Combo deal perfect for a family of four! Get 2 large pizzas of your choice, 4 drinks, and 2
            delicious sides at a special discounted price. A perfect meal for movie nights, family gatherings, or when
            you just don't feel like cooking.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
              <span>Valid until: May 31, 2025</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
              <span>Available: Every day</span>
            </div>
          </div>

          <Tabs defaultValue="included">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="included">What's Included</TabsTrigger>
              <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
              <TabsTrigger value="customize">Customize</TabsTrigger>
            </TabsList>

            <TabsContent value="included" className="space-y-4">
              <h3 className="text-lg font-medium mt-4">Included Items:</h3>
              <ul className="space-y-2">
                {includedItems.map((item, index) => (
                  <li key={index} className="flex justify-between items-center border-b pb-2">
                    <span>{item.name}</span>
                    <span className="text-muted-foreground">${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-semibold text-lg pt-2">
                <span>Regular Total:</span>
                <span>${totalRegularPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-green-600">
                <span>Your Price:</span>
                <span>${(29.99).toFixed(2)}</span>
              </div>
            </TabsContent>

            <TabsContent value="terms">
              <div className="space-y-4 mt-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <p>Offer valid for dine-in, takeaway, and delivery orders.</p>
                </div>
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <p>Cannot be combined with other offers or discounts.</p>
                </div>
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <p>Pizzas can be selected from our classic range. Premium toppings may incur additional charges.</p>
                </div>
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <p>Drinks include regular-sized soft drinks or bottled water.</p>
                </div>
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <p>Sides can be chosen from garlic bread, chicken wings, or potato wedges.</p>
                </div>
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <p>Offer valid until May 31, 2025.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="customize">
              <div className="space-y-4 mt-4">
                <p>Customize your Family Combo with the following options:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2">Pizza Options</h4>
                      <p className="text-sm text-muted-foreground">
                        Choose any 2 from: Pepperoni, Margherita, Vegetarian, Hawaiian, BBQ Chicken, Supreme, or Meat
                        Lovers.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2">Drink Options</h4>
                      <p className="text-sm text-muted-foreground">
                        Choose any 4 from: Coca-Cola, Diet Coke, Sprite, Fanta, Water, or Iced Tea.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2">Side Options</h4>
                      <p className="text-sm text-muted-foreground">
                        Choose any 2 from: Garlic Bread, Chicken Wings, Potato Wedges, Onion Rings, or Mozzarella
                        Sticks.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2">Extras (Additional Cost)</h4>
                      <p className="text-sm text-muted-foreground">
                        Add extra cheese, premium toppings, dipping sauces, or upgrade to large sides.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Order Summary</h3>
                <p className="text-muted-foreground">Family Combo Special Offer</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Regular price</span>
                  <span>$39.99</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount (25%)</span>
                  <span>-$10.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>$29.99</span>
                </div>
              </div>

              <Button onClick={handleAddToCart} className="w-full" size="lg" disabled={loading}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {loading ? "Adding to Cart..." : "Add to Cart"}
              </Button>

              <div className="text-sm text-muted-foreground">
                <p className="flex items-center">
                  <Info className="h-4 w-4 mr-1" />
                  You'll be able to customize your order in the next step
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">You might also like</h3>
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-32 w-full">
                    <Badge className="absolute top-2 right-2 z-10">15% OFF</Badge>
                    <Image
                      src="/placeholder.svg?height=150&width=400"
                      alt="Dessert Bundle"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium">Dessert Bundle</h4>
                    <p className="text-sm text-muted-foreground">4 Desserts for $15.99</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-32 w-full">
                    <Badge className="absolute top-2 right-2 z-10">NEW</Badge>
                    <Image
                      src="/placeholder.svg?height=150&width=400"
                      alt="Premium Sides"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium">Premium Sides</h4>
                    <p className="text-sm text-muted-foreground">Try our new loaded fries</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
