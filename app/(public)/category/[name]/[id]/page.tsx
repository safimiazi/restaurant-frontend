"use client"

import { useEffect, useState } from "react"
import { FoodItem } from "@/components/food-item"
import { Skeleton } from "@/components/ui/skeleton"
import { useProductGetAllByCategoryIdQuery } from "@/redux/api/ProductApi"
import { useParams, useRouter } from "next/navigation"



export default function CategoryPage() {
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const {name , id} = useParams()
  const {data: products, isLoading} = useProductGetAllByCategoryIdQuery({
    isDelete: false,
    pageIndex: pageIndex - 1, 
    pageSize,
    categoryId: id

  })



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{isLoading ? "isLoading..." : decodeURIComponent(typeof name === "string" ? name : "")}</h1>

      {isLoading ? (
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
          {products?.data?.result?.map((item: any, inx: number) => (
            <FoodItem key={inx} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
