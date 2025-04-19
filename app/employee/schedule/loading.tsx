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

      <Skeleton className="h-[600px] w-full" />
    </div>
  )
}
