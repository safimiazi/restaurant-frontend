import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[150px]" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-[150px] w-full" />
        <Skeleton className="h-[150px] w-full" />
        <Skeleton className="h-[150px] w-full" />
        <Skeleton className="h-[150px] w-full" />
      </div>

      <Skeleton className="h-[400px] w-full" />
    </div>
  )
}
