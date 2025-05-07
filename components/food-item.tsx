"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import ProductCartImageSlider from "./pageComponent/productPage/ProductCartImageSlider"



export function FoodItem({ item }: any) {
  const { addToCart } = useCart()
  console.log("ss", item)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      {/* <Link href={`/food/${item.id}`}> */}
        <CardContent className="p-0">
          <div className="relative h-48 w-full">
          <ProductCartImageSlider 
  thumbnail={item.thumbnail} 
  images={item.images} 
  video={item.video} 
/>
          </div>
          <div className="p-4">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
            <p className="mt-2 font-medium">${item.price.toFixed(2)}</p>
          </div>
        </CardContent>
      {/* </Link> */}
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => addToCart(item)} className="w-full" variant="outline">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
