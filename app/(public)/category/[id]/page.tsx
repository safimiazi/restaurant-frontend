"use client"

import { useEffect, useState } from "react"
import { FoodItem } from "@/components/food-item"
import { Skeleton } from "@/components/ui/skeleton"

interface CategoryPageProps {
  params: {
    id: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [loading, setLoading] = useState(true)
  const [categoryName, setCategoryName] = useState("")
  const [items, setItems] = useState([])

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchCategoryData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on category ID
      const categoryData = {
        "fast-food": {
          name: "Fast Food",
          items: [
            {
              id: "1",
              name: "Chicken Burger",
              description: "Juicy chicken patty with fresh vegetables",
              price: 8.99,
              image: "/placeholder.svg?height=200&width=200",
              category: "fast-food",
            },
            {
              id: "3",
              name: "Pepperoni Pizza",
              description: "Classic pepperoni pizza with mozzarella cheese",
              price: 12.99,
              image: "/placeholder.svg?height=200&width=200",
              category: "fast-food",
            },
            {
              id: "5",
              name: "Chicken Wings",
              description: "Spicy chicken wings with dipping sauce",
              price: 9.99,
              image: "/placeholder.svg?height=200&width=200",
              category: "fast-food",
            },
            {
              id: "6",
              name: "French Fries",
              description: "Crispy golden french fries with ketchup",
              price: 3.99,
              image: "/placeholder.svg?height=200&width=200",
              category: "fast-food",
            },
          ],
        },
        desserts: {
          name: "Desserts",
          items: [
            {
              id: "2",
              name: "Chocolate Cake",
              description: "Rich chocolate cake with fudge frosting",
              price: 6.99,
              image: "/placeholder.svg?height=200&width=200",
              category: "desserts",
            },
            {
              id: "7",
              name: "Ice Cream Sundae",
              description: "Vanilla ice cream with chocolate sauce and nuts",
              price: 5.99,
              image: "/placeholder.svg?height=200&width=200",
              category: "desserts",
            },
            {
              id: "8",
              name: "Cheesecake",
              description: "Creamy cheesecake with berry compote",
              price: 7.99,
              image: "/placeholder.svg?height=200&width=200",
              category: "desserts",
            },
          ],
        },
        drinks: {
          name: "Drinks",
          items: [
            {
              id: "4",
              name: "Strawberry Milkshake",
              description: "Creamy milkshake with fresh strawberries",
              price: 4.99,
              image: "/placeholder.svg?height=200&width=200",
              category: "drinks",
            },
            {
              id: "9",
              name: "Iced Coffee",
              description: "Cold brewed coffee with milk and ice",
              price: 3.99,
              image: "/placeholder.svg?height=200&width=200",
              category: "drinks",
            },
            {
              id: "10",
              name: "Fresh Orange Juice",
              description: "Freshly squeezed orange juice",
              price: 4.49,
              image: "/placeholder.svg?height=200&width=200",
              category: "drinks",
            },
          ],
        },
        "main-course": {
          name: "Main Course",
          items: [
            {
              id: "11",
              name: "Grilled Salmon",
              description: "Grilled salmon with lemon butter sauce",
              price: 16.99,
              image: "/placeholder.svg?height=200&width=200",
              category: "main-course",
            },
            {
              id: "12",
              name: "Steak",
              description: "Juicy steak with mashed potatoes and vegetables",
              price: 19.99,
              image: "/placeholder.svg?height=200&width=200",
              category: "main-course",
            },
            {
              id: "13",
              name: "Pasta Carbonara",
              description: "Creamy pasta with bacon and parmesan",
              price: 14.99,
              image: "/placeholder.svg?height=200&width=200",
              category: "main-course",
            },
          ],
        },
      }

      const data = categoryData[params.id] || { name: "Category Not Found", items: [] }
      setCategoryName(data.name)
      setItems(data.items)
      setLoading(false)
    }

    fetchCategoryData()
  }, [params.id])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{loading ? "Loading..." : categoryName}</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <FoodItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
