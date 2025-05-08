import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BadgeCheck } from "lucide-react"

interface FoodCategoryProps {
  item: {
    _id: string
    name: string
    image: string
    description?: string
    isActive?: boolean
  }
}

export function FoodCategory({ item }: FoodCategoryProps) {
  const { _id, name, image,  isActive } = item
  
  const createSlug = (str: string) => {
    return str
      .toLowerCase()
      .replace(/ /g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
  }
  return (
    <Link href={`/category/${createSlug(name)}/${_id}`}>
    {/* <Link href={`/category/fast-food`}> */}
      <Card className="group relative overflow-hidden rounded-2xl border transition-all hover:shadow-lg">
     

        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative h-40 w-full">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>

          {/* Text Section */}
          <div className="p-4 space-y-1 text-center">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {name}
            </h3>
       
            {isActive ? (
              <p className="mt-1 text-xs font-medium text-green-600 flex items-center justify-center gap-1">
                <BadgeCheck className="h-4 w-4" /> Active
              </p>
            ) : (
              <p className="mt-1 text-xs font-medium text-gray-400">Inactive</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
