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

export default function WeekendSpecialPage() {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleAddToCart = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      addToCart({
        id: "weekend-special",
        name: "Weekend Special - Buy 1 Get 1 Free Burgers",
        description: "Buy 1 Get 1 Free on all Burgers",
        price: 12.99,
        image: "/placeholder.svg?height=300&width=600",
        variantId: "weekend-special-1",
        variantName: "Weekend Special",
      })

      toast({
        title: "Added to cart",
        description: "Weekend Special has been added to your cart",
      })

      setLoading(false)
    }, 1000)
  }

  const burgerOptions = [
    {
      name: "Classic Beef Burger",
      price: 12.99,
      description: "Beef patty, lettuce, tomato, onion, pickles, and our special sauce",
    },
    { name: "Chicken Burger", price: 11.99, description: "Grilled chicken breast, lettuce, tomato, mayo" },
    { name: "Veggie Burger", price: 10.99, description: "Plant-based patty, lettuce, tomato, onion, vegan mayo" },
    { name: "Spicy Burger", price: 13.99, description: "Beef patty, jalapeños, pepper jack cheese, spicy sauce" },
    {
      name: "Cheese Burger Deluxe",
      price: 14.99,
      description: "Double beef patty, double cheese, bacon, lettuce, tomato",
    },
    { name: "BBQ Burger", price: 13.99, description: "Beef patty, BBQ sauce, onion rings, cheddar cheese" },
  ]

  return (
    <div className="space-y-8">
      <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
        <Badge className="absolute top-4 right-4 z-10 text-lg px-3 py-1.5">BOGO</Badge>
        <Image src="/placeholder.svg?height=300&width=1200" alt="Weekend Special" fill className="object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Weekend Special - Buy 1 Get 1 Free Burgers</h2>
            <div className="flex items-center mt-2">
              <Badge variant="outline" className="text-green-600 border-green-600 text-base">
                Buy One Get One Free
              </Badge>
            </div>
          </div>

          <p className="text-lg">
            Make your weekend special with our amazing Buy One Get One Free burger deal! Purchase any burger from our
            menu and get a second burger of equal or lesser value absolutely FREE. This offer is perfect for sharing
            with friends, family, or saving one for later.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
              <span>Valid: Every Friday, Saturday, and Sunday</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
              <span>Available: 11 AM - 10 PM</span>
            </div>
          </div>

          <Tabs defaultValue="options">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="options">Burger Options</TabsTrigger>
              <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
              <TabsTrigger value="customize">Customize</TabsTrigger>
            </TabsList>

            <TabsContent value="options" className="space-y-4">
              <h3 className="text-lg font-medium mt-4">Available Burger Options:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {burgerOptions.map((burger, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{burger.name}</h4>
                        <span className="font-semibold">${burger.price.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{burger.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="terms">
              <div className="space-y-4 mt-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <p>Offer valid only on Fridays, Saturdays, and Sundays from 11 AM to 10 PM.</p>
                </div>
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <p>Free burger must be of equal or lesser value than the purchased burger.</p>
                </div>
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <p>Valid for dine-in and takeaway orders only. Not available for delivery.</p>
                </div>
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <p>Cannot be combined with other offers, discounts, or promotions.</p>
                </div>
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <p>Limited to one free burger per customer per visit.</p>
                </div>
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <p>Management reserves the right to modify or cancel the promotion at any time.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="customize">
              <div className="space-y-4 mt-4">
                <p>Customize your burgers with the following options:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2">Extra Toppings</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex justify-between">
                          <span>Extra Cheese</span>
                          <span>+$1.50</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Bacon</span>
                          <span>+$2.00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Avocado</span>
                          <span>+$1.75</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Fried Egg</span>
                          <span>+$1.50</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2">Sides</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex justify-between">
                          <span>French Fries</span>
                          <span>+$3.99</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Onion Rings</span>
                          <span>+$4.49</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Sweet Potato Fries</span>
                          <span>+$4.99</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Side Salad</span>
                          <span>+$3.99</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2">Drinks</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex justify-between">
                          <span>Soft Drink</span>
                          <span>+$2.49</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Milkshake</span>
                          <span>+$4.99</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Craft Beer</span>
                          <span>+$5.99</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Bottled Water</span>
                          <span>+$1.99</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2">Bun Options</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex justify-between">
                          <span>Regular Bun</span>
                          <span>Included</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Brioche Bun</span>
                          <span>+$1.00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Gluten-Free Bun</span>
                          <span>+$2.00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Lettuce Wrap</span>
                          <span>No charge</span>
                        </li>
                      </ul>
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
                <p className="text-muted-foreground">Weekend Special - BOGO Burgers</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>First Burger</span>
                  <span>$12.99</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Second Burger</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>$12.99</span>
                </div>
              </div>

              <Button onClick={handleAddToCart} className="w-full" size="lg" disabled={loading}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {loading ? "Adding to Cart..." : "Add to Cart"}
              </Button>

              <div className="text-sm text-muted-foreground">
                <p className="flex items-center">
                  <Info className="h-4 w-4 mr-1" />
                  You'll be able to select your burgers in the next step
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Perfect Additions</h3>
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-32 w-full">
                    <Badge className="absolute top-2 right-2 z-10">COMBO</Badge>
                    <Image
                      src="/placeholder.svg?height=150&width=400"
                      alt="Fries & Drink Combo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium">Fries & Drink Combo</h4>
                    <p className="text-sm text-muted-foreground">Add fries and drink for just $4.99</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-32 w-full">
                    <Badge className="absolute top-2 right-2 z-10">POPULAR</Badge>
                    <Image
                      src="/placeholder.svg?height=150&width=400"
                      alt="Loaded Fries"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium">Loaded Fries</h4>
                    <p className="text-sm text-muted-foreground">Cheese, bacon, and special sauce</p>
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
