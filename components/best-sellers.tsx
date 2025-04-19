import { FoodItem } from "@/components/food-item"

export function BestSellers() {
  // In a real app, this would come from an API
  const bestSellers = [
    {
      id: "1",
      name: "Chicken Burger",
      description: "Juicy chicken patty with fresh vegetables",
      price: 8.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "fast-food",
    },
    {
      id: "2",
      name: "Chocolate Cake",
      description: "Rich chocolate cake with fudge frosting",
      price: 6.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "desserts",
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
      id: "4",
      name: "Strawberry Milkshake",
      description: "Creamy milkshake with fresh strawberries",
      price: 4.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "drinks",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {bestSellers.map((item) => (
        <FoodItem key={item.id} item={item} />
      ))}
    </div>
  )
}
