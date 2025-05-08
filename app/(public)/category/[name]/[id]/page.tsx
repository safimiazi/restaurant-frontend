"use client";

import { useEffect, useState } from "react";
import { FoodItem } from "@/components/food-item";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductGetAllByCategoryIdQuery } from "@/redux/api/ProductApi";
import { useParams, useRouter } from "next/navigation";
import CommonWidth from "@/components/ui/common-width";

export default function CategoryPage() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { name, id } = useParams() as { name: string; id: string };
  const { data: products, isLoading } = useProductGetAllByCategoryIdQuery({
    isDelete: false,
    pageIndex: pageIndex - 1,
    pageSize,
    categoryId: id,
  });

  return (
    <CommonWidth>
      <h1 className="text-3xl font-bold mb-6">
        {isLoading ? "isLoading..." : name.replace(/-/g, " ")}
      </h1>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.data?.result?.map((item: any, inx: number) => (
            <FoodItem key={inx} item={item} />
          ))}
        </div>
      )}
    </CommonWidth>
  );
}
