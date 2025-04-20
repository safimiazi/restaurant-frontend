import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface FoodCategoryProps {
  id: string
  name: string
  image: string
}

export function FoodCategory({ id, name, image }: FoodCategoryProps) {
  return (
    <Link href={`/category/${id}`}> 
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative h-40 w-full">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div className="p-4 text-center">
            <h3 className="font-medium">{name}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
